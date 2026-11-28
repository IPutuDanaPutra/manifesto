export function EdgeFade({ edge }: { edge: "top" | "bottom" }) {
  return (
    <div className={`edge-fade ${edge}`}>
      <i />
      <i />
      <i />
    </div>
  );
}
