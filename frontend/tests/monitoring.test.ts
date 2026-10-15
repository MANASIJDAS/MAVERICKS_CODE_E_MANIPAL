import { medianMad, ewma } from '../../features/monitoring/baseline'

test('medianMad basic', () => {
  const res = medianMad([60, 61, 62, 100, 63])
  expect(res.median).toBe(62)
  expect(res.mad).toBeGreaterThan(0)
})
