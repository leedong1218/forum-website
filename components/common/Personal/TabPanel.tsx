type Props = {
  children: React.ReactNode;
  value: number;
  index: number;
};

export default function TabPanel(props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ padding: 24 }}
    >
      {value === index && children}
    </div>
  );
}