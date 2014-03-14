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
        heelStitches: function (cuffStitches) {
            var calcHeelStitches = cuffStitches/2;
            return calcHeelStitches;
        },
        heelRows: function (gaugeRows, heelLength) {
            var calcHeelRows = gaugeRows*heelLength;
            if (calcHeelRows % 2 > 0) {
                calcHeelRows += 1;
            }
            return calcHeelRows;
        },
        heelTurn: function (heelStitches) {
            var heelDecreaseStitches;
            var calcHeelTurnBase = 10;
            if ((heelStitches - calcHeelTurnBase) % 2 > 0) {
                calcHeelTurnBase -= 1;
            }
            heelDecreaseStitches = (heelStitches - calcHeelTurnBase) / 2;
            return {
                heelTurnStitches: calcHeelTurnBase,
                heelDecreaseStitches: heelDecreaseStitches
            };
        },
        gussetPickUpStitches: function (heelLength, gaugeRows) {
            var calcGussetPickUpStitches = gaugeRows*heelLength;
            return calcGussetPickUpStitches;
        }
    };
    
    $('#calculate').click(function() {
        var stitchesPerInch = parseFloat($('input[name=stitchesPerInch]').val());
        var circumferenceOfCuff = parseFloat($('input[name=circumferenceOfCuff]').val());

        var numberOfCuffStitches = stitchCalculator.cuffStitches (stitchesPerInch, circumferenceOfCuff);
        var numberOfCuffRows = stitchCalculator.cuffRows (3, 3);
        var numberOfLegRows = stitchCalculator.legRows (3, 5);
        var numberOfHeelStitches = stitchCalculator.heelStitches(numberOfCuffStitches);
        var numberOfHeelRows = stitchCalculator.heelRows (3, 5);
        var heelTurn = stitchCalculator.heelTurn(numberOfHeelStitches);
        var numberOfGussetPickUpStitches = stitchCalculator.gussetPickUpStitches(3, 5);
        
        $(".cuff-stitches").text(numberOfCuffStitches);
        $(".cuff-rows").text(numberOfCuffRows);
        $(".leg-rows").text(numberOfLegRows);
        $(".heel-stitches").text(numberOfHeelStitches);
        $(".heel-rows").text(numberOfHeelRows);
        $(".heel-base").text(heelTurn.heelTurnStitches);
        $(".split-heel-stitches").text(heelTurn.heelTurnStitches + heelTurn.heelDecreaseStitches - 1);
        $(".heel-work").text(heelTurn.heelTurnStitches - 1);
        $(".gusset-pick-up-stitches").text(numberOfGussetPickUpStitches);
    });

    $("form").submit(function () {
        return false;
    });
});