import { axisBottom, axisRight } from 'd3-axis'
import { scaleLinear } from 'd3-scale'
import { curveLinear } from 'd3-shape'
import { points } from 'web/pages/[username]/calibration'
import { LinePath, SVGChart, formatPct } from './helpers'

type Point = { x: number; y: number }

export function CalibrationChart(props: {
  yesPoints: Point[]
  noPoints: Point[]
  width: number
}) {
  const { yesPoints, noPoints, width } = props

  const height = width * 1 // square aspect ratio

  const margin = { top: 5, bottom: 30, left: 5, right: 30 }
  const innerW = width - (margin.left + margin.right)
  const innerH = height - (margin.top + margin.bottom)

  const xScale = scaleLinear()
    .domain([0, 1])
    .range([5, innerW - 5])
  const yScale = scaleLinear()
    .domain([0, 1])
    .range([innerH - 5, 5])

  const tickVals = points.map((p) => p / 100)

  const xAxis = axisBottom<number>(xScale)
    .tickFormat(formatPct)
    .tickValues(tickVals)

  const yAxis = axisRight<number>(yScale)
    .tickFormat(formatPct)
    .tickValues(tickVals)

  const px = (p: Point) => xScale(p.x)
  const py = (p: Point) => yScale(p.y)

  return (
    <SVGChart w={width} h={height} xAxis={xAxis} yAxis={yAxis} margin={margin}>
      <LinePath
        data={yesPoints}
        px={px}
        py={py}
        curve={curveLinear}
        stroke="green"
      />
      <LinePath
        data={noPoints}
        px={px}
        py={py}
        curve={curveLinear}
        stroke="red"
      />
      {/* points */}
      {yesPoints.map((p, i) => (
        // triangle pointing up
        <polygon
          key={i}
          points={`
           ${px(p)},${py(p) - 6}
            ${px(p) - 3 * V3},${py(p) + 3}
            ${px(p) + 3 * V3},${py(p) + 3}`}
          fill="green"
        />
      ))}
      {noPoints.map((p, i) => (
        // triangle pointing down
        <polygon
          key={i}
          points={`
            ${px(p)},${py(p) + 6}
            ${px(p) - 3 * V3},${py(p) - 3}
            ${px(p) + 3 * V3},${py(p) - 3}`}
          fill="red"
        />
      ))}

      {/* line x = y */}
      <line
        x1={xScale(0)}
        y1={yScale(0)}
        x2={xScale(1)}
        y2={yScale(1)}
        stroke="rgb(99 102 241)"
        strokeWidth={1}
        strokeDasharray="4 8"
      />
    </SVGChart>
  )
}

// √3
const V3 = Math.sqrt(3)