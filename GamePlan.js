/*!
Create Game plan or schedule using this script
Author : Mayank Bhardwaj

Version 1.1.0
Full source at https://github.com/mayankbhardwaj/chosen

format data like below :
var vAllTable = { "1": { data: ['ABCVFGDJKJS', '1','1','1'] },
    "2": {  data: ['HIJ'] },
    "3": {  data: ['LMP', '1'] },
    "4": {  data: ['RST'] },
    "5": {  data: ['VWX'] },
    "6": {  data: ['ZAB', '1','1'] },
    "7": { data: ['DEF', '1'] },
    "8": { data: ['VWX'] },
    "9": { data: ['ZABDS', '1','1'] },
    "10": { data: ['DEFDG'] },
    "11": { data: ['VWXTY'] },
    "12": { data: ['ZABBVH', '1'] },
    "13": { data: ['DEFJG', '1'] },
    "14": { data: ['VWXBC'] },
    "15": { data: ['ZABSK ', '1','1','1','1'] },
    "16": { data: ['DEFBV'] }
};

and call drawTables function:
drawTables(vAllTable, 20, 50, 25, 90);
*/
var vArrTablePos = [[]];
var vtblCount = 0;
var vRow = 0;
var vCol = -1;
var vAllT = [[]];
var vArrTo = [[]];
var vArrFrom = [[]];
var vArrFromTo = [[]];
var vCountTo = 0;
var vCountFrom = 0;
var vCountFromTo = 0;
var vCanvas = [];
var Mcount = 0;
var vmaxHeightCol = 0;
var vMaxWidhColPos = [];
var vCountMaxWidth = 0;
var vSpace = 4;
var vSpaceS = 4;
var vProgression =[[]];
var vxNRStart;

function drawTables(vTableAll, vxStart, vyStart, vHeight, vColumnOffset) {
    vCanvas.push(document.getElementById('simpletable').height);
    vCanvas.push(document.getElementById('simpletable').width);
    var vtblwidthFactor = 9;
    var vFirstEnd;
    var vSecondStart;
    var vSecondEnd;
    var vWithTable;
    var vHeightTable;
    var vxMStart;
    var vyMStart;

    var vyNRStart;
    var vxLStart;
    var vyLStart;
    var voffsetNR;
    var vmaxwidthNR = 0;
    var vmaxWidthAll = 0;
    var vNumberOfTables = 0;
    voffsetNR = 20;
    var vCheckWidth = 0;
    var vTotalCol = 0;
    $.each(vTableAll, function (key, value) {
        vNumberOfTables++;
    });
    vxNRStart = vxStart;
    vyNRStart = vyStart;
    vyLStart = vyStart;

    CalculateTables(vTableAll, vNumberOfTables);
    var count = 0;
    var Lcount = 0;
    var vExpCol = (Math.log(vNumberOfTables) / Math.LN2) + 1;

    for (var i = 0; i < vAllT.length - 1; i++) {
        vyNRStart = vyNRStart + 30;
        vxNRStart = vxNRStart + 15;
        drawAllTables(vxNRStart, vyNRStart, vHeight, vAllT[i + 1], i);
    }
}

function CalculateTables(vTableAll, vLength) {
    var vExpCol = (Math.log(vLength) / Math.LN2) + 1;
    var vTotalCol = 1;
    var vCount = 0;
    var vinCount = 0;
    var vInternal = [[]];
    $.each(vTableAll, function (key, value) {
        for (var j = 0; j < value.data.length; j++) {
            if (j + 1 > vAllT.length - 1) {
                vAllT[j + 1] = new Array();
                if (value.data[j + 1] == '1') {
                    vAllT[j + 1].push(vCount + "-" + value.data[0] + "-1");
                }
                else {
                    if (value.data.length == vExpCol) {
                        vAllT[j + 1].push(vCount + "-" + value.data[0] + "-2");
                    }
                    else {
                        vAllT[j + 1].push(vCount + "-" + value.data[0] + "-0");
                    }
                }
            }
            else {
                if (value.data.length < 2) {
                    vAllT[j + 1].push(vCount + "-" + value.data[0] + "-0");
                }
                else {
                    if (value.data[j + 1] == '1') {
                        vAllT[j + 1].push(vCount + "-" + value.data[0] + "-1");
                    }
                    else {
                        vAllT[j + 1].push(vCount + "-" + value.data[0] + "-0");
                    }
                }
            }
        }
        vInternal[0].push(vAllT);
        vCount++;
    });
    return vAllT;
}

function drawAllTables(xStart, yStart, vheight, vtblData, count) {
    var vtblwidthFactor = 9;
    var vwidth = widthofGameTable(vtblData) * vtblwidthFactor + 2;
    //var vrow = vtblData.length;
    var vrow = 1;
    var voffset = 4
    var vXAxis = xStart;
    var vYAxis = yStart;
    var vYIncre = vheight;
    var vBHeight = vrow * vheight;
    var ctx = document.getElementById('simpletable').getContext('2d');
    var vlinewidth = 3;
    

    //ctx.fillText(vtblData[0], xStart - vlinewidth + voffset, yStart - vlinewidth - voffset);

    for (var i = 0; i < vtblData.length; i++) {
        if (i % 2 == 0) {
            yStart = yStart + 20;
            vYAxis = vYAxis + 20;
        }
        ctx.beginPath();
        //ctx.stroke();
        var vSplit = vtblData[i].split('-');
        ctx.lineWidth = vlinewidth;
        if (vSplit[2] == '1') {
            ctx.fillStyle = 'green';
        }
        else if (vSplit[2] == '0') {
            ctx.fillStyle = 'red';
        }
        else if (vSplit[2] == '2') {
            ctx.fillStyle = 'blue';
        }
        ctx.fillRect(xStart, (yStart + i * vYIncre), vwidth, vheight);
        ctx.strokeStyle = 'rgb(207,212,200)';
        ctx.strokeRect(vXAxis, vYAxis, vwidth, vBHeight);
        vArrTablePos[count] = new Array();
        vArrTablePos[count].push(vXAxis);
        vArrTablePos[count].push(vYAxis);
        //ctx.fillStyle = 'blue)';
        //vXAxis = vXAxis + vwidth;
        vYAxis = vYAxis + vBHeight;
        ctx.fillStyle = 'black';
        ctx.font = '10pt Verdana';
        ctx.fillText(vSplit[1], xStart + voffset, (yStart - vlinewidth + (i + 1) * vYIncre - voffset));
        //if (vxNRStart < (xStart + voffset + yStart - vlinewidth + (i + 1) * vYIncre - voffset)) {
        if (vxNRStart < (xStart + vwidth + voffset)) {
            vxNRStart = xStart + vwidth + voffset + 40;
            //vxNRStart = (xStart + voffset + yStart - vlinewidth + (i + 1) * vYIncre - voffset);
        }
        ctx.stroke();
    }

}

function drawNewTableIndep(xStart, yStart, vheight, vtblData) {
    var vtblwidthFactor = 9;
    var vwidth = widthofGameTable(vtblData) * vtblwidthFactor + 2;
    var vrow = vtblData.data[0].length;
    var voffset = 4
    var vXAxis = xStart;
    var vYAxis = yStart;
    var vYIncre = vheight;
    var vBHeight = vrow * vheight;
    var ctx = document.getElementById('simpletable').getContext('2d');
    var vlinewidth = 3;
    ctx.beginPath();
    ctx.lineWidth = vlinewidth;
    ctx.fillStyle = 'rgb(255,221,0)';

//    for (var i = 0; i < vtblData.length; i++) {
//        if (vtblData[1] == '1') {
//            ctx.fillStyle = 'rgb(255,221,0)';
//        }
//        else if (vtblData[1] == '0') {
//            ctx.fillStyle = 'rgb(102,204,0)';
//        }
//        else if (vtblData[1] == '2') {
//            ctx.fillStyle = 'rgb(183,4,218)';
//        }
//        ctx.fillRect(xStart, (yStart + i * vYIncre), vwidth, vheight);
    //    }

    ctx.strokeStyle = 'rgb(207,212,200)';
    ctx.strokeRect(vXAxis, vYAxis, vwidth, vBHeight);

    ctx.fillStyle = 'black';
    ctx.font = 'bold 10pt Verdana';
    ctx.fillText(vtblData[0], xStart - vlinewidth + voffset, yStart - vlinewidth - voffset);
    for (var i = 0; i < vtblData.length; i++) {
        ctx.font = '10pt Verdana';
        ctx.fillText(vtblData[0], xStart + voffset, (yStart - vlinewidth + (i + 1) * vYIncre - voffset));
        var vxCordi = xStart + voffset;
        var vyCordi = yStart - vlinewidth + (i + 1) * vYIncre - voffset;
        if (vtblData.data[i][2] != undefined && vtblData.data[i][3] == undefined) {
            //            vArrTo[vCountTo] = new Array();
            //            vArrTo[vCountTo].push(vtblData.datadef);
            //            vArrTo[vCountTo].push(vtblData.data[i][0]);
            //            vArrTo[vCountTo].push(vxCordi);
            //            vArrTo[vCountTo].push(vxCordi + vwidth);
            //            vArrTo[vCountTo].push(vyCordi);
            //            vArrTo[vCountTo].push('left');
            //            vArrTo[vCountTo].push('1');
            //            vArrTo[vCountTo].push('1');
            //            vArrTo[vCountTo].push(vArrTablePos[vtblCount - 1][1]);
            //            vArrTo[vCountTo].push(vArrTablePos[vtblCount - 1][2]);
            //            vCountTo++;
            vArrFromTo[vCountFromTo] = new Array();
            vArrFromTo[vCountFromTo].push(vtblData.datadef);
            vArrFromTo[vCountFromTo].push(vtblData.data[i][0]);
            vArrFromTo[vCountFromTo].push(vxCordi);
            vArrFromTo[vCountFromTo].push(vxCordi + vwidth);
            vArrFromTo[vCountFromTo].push(vyCordi);
            vArrFromTo[vCountFromTo].push('left');
            vArrFromTo[vCountFromTo].push('1');
            vArrFromTo[vCountFromTo].push('1');
            vArrFromTo[vCountFromTo].push(vArrTablePos[vtblCount - 1][1]);
            vArrFromTo[vCountFromTo].push(vArrTablePos[vtblCount - 1][2]);
            //            fnMaxWidhColPos(vArrTablePos[vtblCount - 1][1], vxCordi + vwidth);
            vCountFromTo++;
        }
        else if (vtblData.data[i][2] != undefined && vtblData.data[i][3] != undefined) {
            //            vArrFrom[vCountFrom] = new Array();
            //            vArrFrom[vCountFrom].push(vtblData.datadef);
            //            vArrFrom[vCountFrom].push(vtblData.data[i][0]);
            //            vArrFrom[vCountFrom].push(vxCordi);
            //            vArrFrom[vCountFrom].push(vxCordi + vwidth);
            //            vArrFrom[vCountFrom].push(vyCordi);
            //            vArrFrom[vCountFrom].push('right');
            //            vArrFrom[vCountFrom].push(vtblData.data[i][2]);
            //            vArrFrom[vCountFrom].push(vtblData.data[i][3]);
            //            vArrFrom[vCountFrom].push(vArrTablePos[vtblCount - 1][1]);
            //            vArrFrom[vCountFrom].push(vArrTablePos[vtblCount - 1][2]);
            //            vCountFrom++;
            vArrFromTo[vCountFromTo] = new Array();
            vArrFromTo[vCountFromTo].push(vtblData.datadef);
            vArrFromTo[vCountFromTo].push(vtblData.data[i][0]);
            vArrFromTo[vCountFromTo].push(vxCordi);
            vArrFromTo[vCountFromTo].push(vxCordi + vwidth);
            vArrFromTo[vCountFromTo].push(vyCordi);
            vArrFromTo[vCountFromTo].push('right');
            vArrFromTo[vCountFromTo].push(vtblData.data[i][2]);
            vArrFromTo[vCountFromTo].push(vtblData.data[i][3]);
            vArrFromTo[vCountFromTo].push(vArrTablePos[vtblCount - 1][1]);
            vArrFromTo[vCountFromTo].push(vArrTablePos[vtblCount - 1][2]);
            vCountFromTo++;
        }
    }
}

function widthofGameTable(vtblData) {
    var vmax = vtblData.length;
    for (var i = 0; i < vtblData.length; i++) {
        var vSplit = vtblData[i].split('-');
        var vmaxIn = vSplit[1].length;
        if (vmax < vmaxIn) {
            vmax = vmaxIn;
        }
    }
    return vmax;
}

function widthofTable(vtblData) {
    var vmax = vtblData.datadef.length;
    for (var i = 0; i < vtblData.data.length; i++) {
        var vmaxIn = vtblData.data[i][0].length;
        if (vmax < vmaxIn) {
            vmax = vmaxIn;
        }
    }
    return vmax;
}

function heightofGameTable(vtblData, height) {
    var vheight = (vtblData.length + 1) * height;
    return vheight;
}

function heightofTable(vtblData, height) {
    var vheight = (vtblData.data.length + 1) * height;
    return vheight;
}

function fnSetTablePosition(vtblName, vHeight, vCheck) {
    if (vHeight > vCanvas[0] || vCheck == 0) {
        vCol++;
        Mcount = 0;
        vRow = 0;
    }
    vArrTablePos[vtblCount] = new Array();
    vArrTablePos[vtblCount].push(vtblName);
    vArrTablePos[vtblCount].push(vCol);
    vArrTablePos[vtblCount].push(vRow);
    vtblCount++;
    vRow++;
}

function drawRelations(vDots) {
    fnMaxWidhColPos();
    //alert(vDynaArr);
    var vHeight = 25;
    var ctx = document.getElementById('simpletable').getContext('2d');
    ctx.strokeStyle = 'rgb(82, 109, 246)';
    var vWidth = vHeight / 2;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.8;
    //    for (var i = 0; i < vArrFrom.length; i++) {
    //        var vContent = vArrFrom[i];
    //        var vco = fnFindHim(vContent[6], vContent[7], vArrTo);
    //        if ( (vContent[8] - vco[2]) > 1  ) {
    //            ctx.moveTo(vContent[2], vContent[4]);
    //            ctx.lineTo(vContent[2] - 14, vContent[4]);
    //            ctx.lineTo(vContent[2] - 14, 20);
    //            ctx.lineTo(vco[0] + 10, 20);
    //            ctx.lineTo(vco[0] + 10, vco[1]);
    //            ctx.lineTo(vco[0], vco[1]);
    //            ctx.stroke();
    //        }
    //        else {
    //            ctx.moveTo(vContent[2], vContent[4]);
    //            ctx.lineTo(vContent[2] - 14, vContent[4]);
    //            ctx.lineTo(vco[0] + 10, vco[1]);
    //            ctx.lineTo(vco[0], vco[1]);
    //            ctx.stroke();
    //        }
    //        if (vDots == 1) {
    //            ctx.beginPath();
    //            ctx.arc(vContent[2] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
    //            ctx.fillStyle = '#F8E913';
    //            ctx.fill();
    //            ctx.stroke();
    //            ctx.beginPath();
    //            ctx.arc(vco[0], vco[1], 4, 0, 2 * Math.PI, false);
    //            ctx.fillStyle = '#F8E913';
    //            ctx.fill();
    //            ctx.stroke();
    //        }
    //    }
    for (var i = 0; i < vArrFromTo.length; i++) {
        var vContent = vArrFromTo[i];
        if (vContent[6] != '1' && vContent[7] != '1') {
            var vco = fnFindHim(vContent[6], vContent[7], vArrFromTo);
            if ((vContent[8] - vco[3]) > 1 || (vContent[8] - vco[3]) < -1) {
                //                if ((vContent[8] - vco[3]) < -1) {
                //                    alert(vContent[8] - vco[3]);
                //                }
                var vColor = fnRangeen();
                ctx.beginPath();
                ctx.arc(vContent[2] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
                ctx.strokeStyle = vColor;
                ctx.fillStyle = '#F8E913';
                ctx.fill();
                ctx.stroke();

                ctx.moveTo(vContent[2] - 8, vContent[4]);
                ctx.lineTo(vContent[2] - 14 - vSpace, vContent[4]);
                ctx.lineTo(vContent[2] - 14 - vSpace, 60 - vSpace);
                //                ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 20 + vSpace, 20 - vSpace);
                //                ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 20 + vSpace, vco[1]);
                ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 20 + vSpace, 60 - vSpace);
                ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 20 + vSpace, vco[2]);
                //                ctx.lineTo(vco[0] + 10, 20);
                //                ctx.lineTo(vco[0] + 10, vco[1]);
                //ctx.lineTo(vco[0], vco[1]);
                ctx.lineTo(vco[1], vco[2]);
                ctx.stroke();
                vSpace = vSpace + 6;

                ctx.beginPath();
                //ctx.arc(vco[0], vco[1], 4, 0, 2 * Math.PI, false);
                ctx.arc(vco[1], vco[2], 4, 0, 2 * Math.PI, false);
                ctx.strokeStyle = vColor;
                ctx.fillStyle = '#F8E913';
                ctx.fill();
                ctx.stroke();
            }
            else if ((vContent[8] - vco[3]) == 0) {
                var vColor = fnRangeen();
                ctx.beginPath();
                ctx.arc(vContent[3] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
                ctx.strokeStyle = vColor;
                ctx.fillStyle = '#F8E913';
                ctx.stroke();

                ctx.moveTo(vContent[3], vContent[4]);
                //ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 10 + vSpaceS, vContent[4]);
                //ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 10 + vSpaceS, vco[1]);
                ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 10 + vSpaceS, vContent[4]);
                ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 10 + vSpaceS, vco[2]);
                ctx.lineTo(vco[1], vco[2]);
                //ctx.lineTo(vco[0], vco[1]);
                ctx.stroke();

                ctx.beginPath();
                //ctx.arc(vco[0], vco[1], 4, 0, 2 * Math.PI, false);
                ctx.arc(vco[1], vco[2], 4, 0, 2 * Math.PI, false);
                ctx.strokeStyle = vColor;
                ctx.fillStyle = '#F8E913';
                ctx.fill();
                ctx.stroke();

                vSpaceS = vSpaceS + 5;
                //                var vColor = fnRangeen();
                //                ctx.strokeStyle = vColor;
                //                ctx.moveTo(vContent[3], vContent[4]);
                //                //ctx.lineTo(vContent[3] + 14, vContent[4]);
                //                ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 10, vContent[4]);
                //                ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 10, vco[1]);
                //                //ctx.lineTo(vco[0] + 10, vco[1]);
                //                ctx.lineTo(vco[0], vco[1]);
                //                ctx.stroke();l
                //                ctx.beginPath();
                //                ctx.arc(vContent[3] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
                //                ctx.fillStyle = '#F8E913';
                //                ctx.fill();
                //                ctx.stroke();
                //                ctx.beginPath();
                //                ctx.arc(vco[0], vco[1], 4, 0, 2 * Math.PI, false);
                //                ctx.fillStyle = '#F8E913';
                //                ctx.fill();
                //                ctx.stroke();
            }
            //            else if ((vContent[8] - vco[3]) < -1) {
            //                //alert(vContent[8] - vco[3]);
            //                var vColor = fnRangeen();
            //                ctx.beginPath();
            //                ctx.arc(vContent[2] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
            //                ctx.strokeStyle = vColor;
            //                ctx.fillStyle = '#F8E913';
            //                ctx.fill();
            //                ctx.stroke();

            //                ctx.moveTo(vContent[2] - 8, vContent[4]);
            //                ctx.lineTo(vContent[2] - 14 - vSpace, vContent[4]);
            //                ctx.lineTo(vContent[2] - 14 - vSpace, 20 - vSpace);
            //                ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 20 + vSpace, 20 - vSpace);
            //                ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 20 + vSpace, vco[2]);
            //                ctx.lineTo(vco[1], vco[2]);
            //                ctx.stroke();
            //                vSpace = vSpace + 6;

            //                ctx.beginPath();
            //                ctx.arc(vco[1], vco[2], 4, 0, 2 * Math.PI, false);
            //                ctx.strokeStyle = vColor;
            //                ctx.fillStyle = '#F8E913';
            //                ctx.fill();
            //                ctx.stroke();
            //            }
            else {
                var vColor = fnRangeen();
                if (vContent[8] > vco[3]) {
                    ctx.beginPath();
                    ctx.arc(vContent[2] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = vColor;
                    ctx.fillStyle = '#F8E913';
                    ctx.fill();
                    ctx.stroke();

                    ctx.moveTo(vContent[2] - 8, vContent[4]);
                    ctx.lineTo(vContent[2] - 25, vContent[4]);
                    //ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 10, vco[1]);
                    ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 10, vco[2]);
                    //ctx.lineTo(vco[0], vco[1]);
                    ctx.lineTo(vco[1], vco[2]);
                    ctx.stroke();

                    ctx.beginPath();
                    //ctx.arc(vco[0], vco[1], 4, 0, 2 * Math.PI, false);
                    ctx.arc(vco[1], vco[2], 4, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = vColor;
                    ctx.fillStyle = '#F8E913';
                    ctx.fill();
                    ctx.stroke();
                }
                else {
                    ctx.beginPath();
                    ctx.arc(vContent[3] - 4, vContent[4], 4, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = vColor;
                    ctx.fillStyle = '#F8E913';
                    ctx.fill();
                    ctx.stroke();

                    ctx.moveTo(vContent[3], vContent[4]);
                    //ctx.lineTo(vContent[3] + 14, vContent[4]);
                    ctx.lineTo(vMaxWidhColPos[vContent[8] - 1][1] + 1, vContent[4]);
                    //ctx.lineTo(vMaxWidhColPos[vco[2] - 1][1] + 10, vco[1]);
                    //ctx.lineTo(vMaxWidhColPos[vco[3] - 1][1] + 10, vco[2]);
                    ctx.lineTo(vco[0] - 25, vco[2]);
                    //ctx.lineTo(vco[0], vco[1]);
                    ctx.lineTo(vco[0] - 8, vco[2]);
                    ctx.stroke();

                    ctx.beginPath();
                    //ctx.arc(vco[0], vco[1], 4, 0, 2 * Math.PI, false);
                    ctx.arc(vco[0] - 8, vco[2], 4, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = vColor;
                    ctx.fillStyle = '#F8E913';
                    ctx.fill();
                    ctx.stroke();
                }
            }
            if (vDots == 1) {
            }
        }
    }
}

function fnFindHimOld(vLook1, vLook2, vTarget) {
    var vCoOrdi = [];
    for (var i = 0; i < vTarget.length; i++) {
        //var vContent = vTarget[i];
        var vIndex = jQuery.inArray(vLook2, vTarget[i]);
        if (vIndex != -1 && vLook1 == vTarget[i][0]) {
            if (vTarget[i][5] == 'left' || vTarget[i][5] == 'centre') {
                vCoOrdi.push(vTarget[i][3] - 4);
                vCoOrdi.push(vTarget[i][4]);
            }
            else {
                vCoOrdi.push(vTarget[i][2] + 4);
                vCoOrdi.push(vTarget[i][4]);
            }
            vCoOrdi.push(vTarget[i][8]);
            vCoOrdi.push(vTarget[i][9]);
        }
    }
    return vCoOrdi;
}

function fnFindHim(vLook1, vLook2, vTarget) {
    var vCoOrdi = [];
    for (var i = 0; i < vTarget.length; i++) {
        //var vContent = vTarget[i];
        var vIndex = jQuery.inArray(vLook2, vTarget[i]);
        if (vIndex != -1 && vLook1 == vTarget[i][0]) {
            vCoOrdi.push(vTarget[i][2] + 4);
            vCoOrdi.push(vTarget[i][3] - 4);
            vCoOrdi.push(vTarget[i][4]);
            vCoOrdi.push(vTarget[i][8]);
            vCoOrdi.push(vTarget[i][9]);
        }
    }
    return vCoOrdi;
}

function fnRangeen() {
    var vColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    return vColor;
}

function fnMaxWidhColPos(vCol, vMaxwidth) {
    if (vCountMaxWidth == 0) {
        vMaxWidhColPos[vCountMaxWidth] = new Array();
        vMaxWidhColPos[vCountMaxWidth].push(vCol);
        vMaxWidhColPos[vCountMaxWidth].push(vMaxwidth);
        vCountMaxWidth++;
    }
    else {
        if (vCountMaxWidth == vCol) {
            if (vMaxWidhColPos[vCountMaxWidth - 1][1] < vMaxwidth) {
                vMaxWidhColPos[vCountMaxWidth - 1] = vMaxwidth;
                vCountMaxWidth++;
            }
        }
        else if (vCountMaxWidth > vCol) {
            vMaxWidhColPos[vCountMaxWidth] = new Array();
            vMaxWidhColPos[vCountMaxWidth].push(vCol);
            vMaxWidhColPos[vCountMaxWidth].push(vMaxwidth);
            vCountMaxWidth++;
        }
    }
}


function fnMaxWidhColPos() {
    for (var i = 0; i < vArrFromTo.length; i++) {
        var vContent = vArrFromTo[i];
        var vCheck = vContent[8] - 1;
        if (vCheck == vCountMaxWidth) {
            vMaxWidhColPos[vCheck] = new Array();
            vMaxWidhColPos[vCheck].push(vContent[8]);
            vMaxWidhColPos[vCheck].push(vContent[3]);
            vCountMaxWidth++;
        }
        if (vMaxWidhColPos[vCheck][1] < vContent[3]) {
            vMaxWidhColPos[vCheck][0] = vContent[8];
            vMaxWidhColPos[vCheck][1] = vContent[3];
        }
    }
}
