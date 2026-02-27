import PhaserMock from './__mocks__/phaser'

// @ts-expect-error - Phaser is globally defined in the browser but not in the testing environment
global.Phaser = PhaserMock
