const level = {
  hard: "Крутой повар",
  medium: "Средняя",
  easy: "Просто",
};
export const Level = ({ value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {level[value]}
    </div>
  );
};
