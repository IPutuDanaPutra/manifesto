export function Icon({ name }: { name: string }) {
  return (
    <svg>
      <use href={`#icon-${name}`} />
    </svg>
  );
}
