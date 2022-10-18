describe.skip(`This is Suite-01`, async () => {
    let ucount
    let uacount
    it.skip(`Test Suite-01`, () => { //to skip you can use '.skip' to skip this it block

    })
    xit(`Test Suite-03`, async () => { //to skip you can add letter 'x' to skip it block
        ucount = "   10   "
        uacount = "    15    "
    })
    xit(`Test Suite-02`, async () => { //to skip you can add letter 'x' to skip it block
        ucount1 = Number(ucount)
        uacount1 = Number(uacount)
    })
    xit(`Test Suite-04`, async () => {
        await console.log(typeof (ucount1));
        await console.log(typeof (uacount1));
        await expect(uacount1).toBeGreaterThan(ucount1)
        await console.log(`Values are ${ucount1} and ${uacount1}`);
    })
})

