export default function HeatmapDots({ clicks = [] }) {
  return (
    <div className="heatmap-canvas">
      {clicks.map((click, index) => (
        <span
          key={`${click.session_id}-${click.timestamp}-${index}`}
          className="heat-dot"
          style={{ left: `${click.x}px`, top: `${click.y}px` }}
          title={`x:${click.x}, y:${click.y}`}
        />
      ))}
    </div>
  );
}
