export const CompositionBase = ({ data }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <ul class="compositionBase">
        {data.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};
