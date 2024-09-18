export const XIcon = ({ size }: { size: string | number }) => (
  <svg
    width={size ?? "15"}
    height={size ?? "16"}
    viewBox={`0 0 ${size ?? 15} ${size ?? 16}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.29018 4.49292L3.87451 0.897461H0.458984V4.49292L3.87451 8.02633L0.458984 11.6216V15.1551H3.87451L7.29018 11.6216L10.6437 15.1551H14.0594V11.6216L10.6437 8.02633L14.0594 4.49292V0.897461H10.6437L7.29018 4.49292Z"
      fill="#00D2FF"
    />
  </svg>
);
