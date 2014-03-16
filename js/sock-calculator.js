$(document).ready(function () {
    var stitchCalculator = {
        cuffStitches: function (gaugeStitches, cuffCircumference) {
            var calcCuffStitches = gaugeStitches*cuffCircumference;
            return calcCuffStitches;
        },
        cuffRows: function (gaugeRows, cuffLength) {
            var calcCuffRows = gaugeRows*cuffLength;
            return calcCuffRows;
        },
        legRows: function (gaugeRows, legLength) {
            var calcLegRows = gaugeRows*legLength;
            return calcLegRows;
        },
        halfCuffStitches: function (cuffStitches) {
            var calcHalfCuffStitches = cuffStitches/2;
            return calcHalfCuffStitches;
        },
        heelRows: function (gaugeRows, heelLength) {
            var calcHeelRows = gaugeRows*heelLength;
            if (calcHeelRows % 2 > 0) {
                calcHeelRows += 1;
            }
            return calcHeelRows;
        },
        heelTurn: function (halfCuffStitches) {
            var heelDecreaseStitches;
            var calcHeelTurnBase = 10;
            if ((halfCuffStitches - calcHeelTurnBase) % 2 > 0) {
                calcHeelTurnBase -= 1;
            }
            heelDecreaseStitches = (halfCuffStitches - calcHeelTurnBase) / 2;
            return {
                heelTurnStitches: calcHeelTurnBase,
                heelDecreaseStitches: heelDecreaseStitches
            };
        },
        gussetPickUpStitches: function (heelLength, gaugeRows) {
            var calcGussetPickUpStitches = gaugeRows*heelLength;
            return calcGussetPickUpStitches;
        },
        gussetDecrease: function (halfCuffStitches, gussetPickUpStitches, heelTurnStitches) {
            var calcGussetRemainderStitches = halfCuffStitches + (gussetPickUpStitches * 2) + heelTurnStitches;
            var calcGussetDecreaseRows = calcGussetRemainderStitches - (halfCuffStitches * 2);
            return {
                gussetRemainderStitches: calcGussetRemainderStitches,
                gussetDecreaseRows: calcGussetDecreaseRows
            };
        },
        footRows: function (gaugeRows, footLength, gussetDecreaseRows) {
            var calcFootRows = (footLength*gaugeRows) - gussetDecreaseRows;
            return calcFootRows;
        }
    };
    
    $('#calculate').click(function() {
        var stitchesPerInch = parseFloat($('input[name=stitchesPerInch]').val());
        var rowsPerInch = parseFloat($('input[name=rowsPerInch]').val());
        var circumferenceOfCuff = parseFloat($('input[name=circumferenceOfCuff]').val());
        var lengthOfCuff = parseFloat($('input[name=lengthOfCuff]').val());
        var lengthOfLeg = parseFloat($('input[name=lengthOfLeg]').val());
        var lengthOfHeel = parseFloat($('input[name=lengthOfHeel]').val());
        var lengthOfFoot = parseFloat($('input[name=lengthOfFoot]').val());
        var lengthOfToe = parseFloat($('input[name=lengthOfToe]').val());


        var numberOfCuffStitches = stitchCalculator.cuffStitches (stitchesPerInch, circumferenceOfCuff);
        var numberOfCuffRows = stitchCalculator.cuffRows (rowsPerInch, lengthOfCuff);
        var numberOfLegRows = stitchCalculator.legRows (rowsPerInch, lengthOfLeg);
        var halfOfCuffStitches = stitchCalculator.halfCuffStitches(numberOfCuffStitches);
        var numberOfHeelRows = stitchCalculator.heelRows (rowsPerInch, lengthOfHeel);
        var heelTurn = stitchCalculator.heelTurn(halfOfCuffStitches);
        var numberOfGussetPickUpStitches = stitchCalculator.gussetPickUpStitches(lengthOfHeel, rowsPerInch);
        var gussetDecrease = stitchCalculator.gussetDecrease(halfOfCuffStitches,numberOfGussetPickUpStitches,heelTurn.heelTurnStitches);
        var footRows = stitchCalculator.footRows(rowsPerInch,lengthOfFoot,gussetDecrease.gussetDecreaseRows);
        
        $(".cuff-stitches").text(numberOfCuffStitches);
        $(".cuff-rows").text(numberOfCuffRows);
        $(".leg-rows").text(numberOfLegRows);
        $(".heel-stitches").text(halfOfCuffStitches);
        $(".heel-rows").text(numberOfHeelRows);
        $(".heel-base").text(heelTurn.heelTurnStitches);
        $(".split-heel-stitches").text(heelTurn.heelTurnStitches + heelTurn.heelDecreaseStitches - 1);
        $(".heel-work").text(heelTurn.heelTurnStitches - 1);
        $(".gusset-pick-up-stitches").text(numberOfGussetPickUpStitches);
        $(".gusset-remainder-stitches").text(gussetDecrease.gussetRemainderStitches);
        $(".gusset-decrease-rows").text(gussetDecrease.gussetDecreaseRows);
        $(".foot-work").text(footRows);
    });

    $("form").submit(function () {
        return false;
    });
});