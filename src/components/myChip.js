import { Chip, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    gap: 8,
    fontSize: '1rem',
    userSelect: 'none',
    textTransform: props => props.color && 'capitalize',
    backgroundColor: 'transparent',
    color: props => props.color || 'var(--base0)',
  },
  icon: {
    color: props => props.color || 'var(--shade40)',
  }
});

const MyChip = ({icon, label, color}) => {
  const props = {
    color: color
  }

  const styles = useStyle(props);

  return (
    <Chip label={label} icon={icon} classes={styles} />
  );
}
 
export default MyChip;