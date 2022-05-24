describe(" set Color tests", function () {
  it("should set the color of an element", function () {
    let tempH1 = document.createElement("h1");

    setColor(tempH1, "red");
    expect(tempH1.style.backgroundColor).toEqual("red");
    tempH1.remove();
  });
});

describe(" random Range tests", function () {
  it("should return a random number ", function () {
    expect(randomRange(0, 4)).not.toBeGreaterThan(3);
    expect(randomRange(0, 4)).not.toBeGreaterThan(3);
    expect(randomRange(0, 4)).not.toBeGreaterThan(3);
    expect(randomRange(0, 4)).not.toBeGreaterThan(3);
    expect(randomRange(0, 4)).not.toBeGreaterThan(3);
    expect(randomRange(0, 4)).not.toBeGreaterThan(3);
  });

  it("should not return a number less than 4", function () {
    expect(randomRange(4, 7)).not.toBeLessThan(4);
    expect(randomRange(4, 7)).not.toBeLessThan(4);
    expect(randomRange(4, 7)).not.toBeLessThan(4);
    expect(randomRange(4, 7)).not.toBeLessThan(4);
    expect(randomRange(4, 7)).not.toBeLessThan(4);
    expect(randomRange(4, 7)).not.toBeLessThan(4);
  });

  it("should return a random number that isn't 3 ", function () {
    expect(randomRange(1, 4, 3)).not.toEqual(3);
    expect(randomRange(1, 4, 3)).not.toEqual(3);
    expect(randomRange(1, 4, 3)).not.toEqual(3);
    expect(randomRange(1, 4, 3)).not.toEqual(3);
    expect(randomRange(1, 4, 3)).not.toEqual(3);
    expect(randomRange(1, 4, 3)).not.toEqual(3);
    expect(randomRange(1, 4, 3)).not.toEqual(3);
  });
});
