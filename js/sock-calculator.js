$(document).ready(() => {
    const stitchCalculator = {
        cuffStitches: (gaugeStitches, cuffCircumference) => gaugeStitches * cuffCircumference,
        cuffRows: (gaugeRows, cuffLength) => gaugeRows * cuffLength,
        legRows: (gaugeRows, legLength) =>  gaugeRows * legLength,
        halfCuffStitches: (cuffStitches) => cuffStitches / 2,
        thirdCuffStitches: (cuffStitches) => cuffStitches / 3,
        quarterCuffStitches: (cuffStitches) => cuffStitches / 4,
        heelRows: (gaugeRows, heelLength) => {
            let calcHeelRows = gaugeRows * heelLength;
            if (calcHeelRows % 2 > 0) {
                calcHeelRows += 1;
            }
            return calcHeelRows;
        },
        heelTurn: (halfCuffStitches) => {
            let heelDecreaseStitches;
            let calcHeelTurnBase = 10;
            if ((halfCuffStitches - calcHeelTurnBase) % 2 > 0) {
                calcHeelTurnBase -= 1;
            }
            heelDecreaseStitches = (halfCuffStitches - calcHeelTurnBase) / 2;
            return {
                heelTurnStitches: calcHeelTurnBase,
                heelDecreaseStitches: heelDecreaseStitches
            };
        },
        gussetPickUpStitches: (heelLength, gaugeRows) => gaugeRows * heelLength,
        gussetDecrease: (halfCuffStitches, gussetPickUpStitches, heelTurnStitches) => {
            let calcGussetRemainderStitches = halfCuffStitches + (gussetPickUpStitches * 2) + heelTurnStitches;
            let calcGussetDecreaseRows = calcGussetRemainderStitches - (halfCuffStitches * 2);
            return {
                gussetRemainderStitches: calcGussetRemainderStitches,
                gussetDecreaseRows: calcGussetDecreaseRows
            };
        },
        footRows: (gaugeRows, footLength, gussetDecreaseRows) => (footLength * gaugeRows) - gussetDecreaseRows
    };
    
    $('#calculate').click(() => {
        let stitchesPerInch = parseFloat($('input[name=stitchesPerInch]').val());
        let rowsPerInch = parseFloat($('input[name=rowsPerInch]').val());
        let circumferenceOfCuff = parseFloat($('input[name=circumferenceOfCuff]').val());
        let lengthOfCuff = parseFloat($('input[name=lengthOfCuff]').val());
        let lengthOfLeg = parseFloat($('input[name=lengthOfLeg]').val());
        let lengthOfHeel = parseFloat($('input[name=lengthOfHeel]').val());
        let lengthOfFoot = parseFloat($('input[name=lengthOfFoot]').val());
        let lengthOfToe = parseFloat($('input[name=lengthOfToe]').val());


        let numberOfCuffStitches = stitchCalculator.cuffStitches (stitchesPerInch, circumferenceOfCuff);
        let thirdOfCuffStitches = stitchCalculator.thirdCuffStitches(numberOfCuffStitches);
        let quarterOfCuffStitches = stitchCalculator.quarterCuffStitches(numberOfCuffStitches);
        let numberOfCuffRows = stitchCalculator.cuffRows (rowsPerInch, lengthOfCuff);
        let numberOfLegRows = stitchCalculator.legRows (rowsPerInch, lengthOfLeg);
        let halfOfCuffStitches = stitchCalculator.halfCuffStitches(numberOfCuffStitches);
        let numberOfHeelRows = stitchCalculator.heelRows (rowsPerInch, lengthOfHeel);
        let heelTurn = stitchCalculator.heelTurn(halfOfCuffStitches);
        let numberOfGussetPickUpStitches = stitchCalculator.gussetPickUpStitches(lengthOfHeel, rowsPerInch);
        let gussetDecrease = stitchCalculator.gussetDecrease(halfOfCuffStitches,numberOfGussetPickUpStitches,heelTurn.heelTurnStitches);
        let footRows = stitchCalculator.footRows(rowsPerInch,lengthOfFoot,gussetDecrease.gussetDecreaseRows);

        
        $(".cuff-stitches").text(numberOfCuffStitches);
        $(".third-cuff-stitches").text(thirdOfCuffStitches);
        $(".quarter-cuff-stitches").text(quarterOfCuffStitches);
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

    $("form").submit(() => {
        return false;
    });
});