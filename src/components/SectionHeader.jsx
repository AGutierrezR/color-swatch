function SectionHeader({ title, subtitle, description, titleSize = "text-[1.5rem]" }) {
  return (
    <div className="mb-4">
      {subtitle && <p className="text-[0.625rem] uppercase font-semibold">{subtitle}</p>}
      <h2 className={`font-normal ${titleSize}`}>{title}</h2>
      {description && <p className="text-sm text-base-content/60">{description}</p>}
    </div>
  );
}

export default SectionHeader;
