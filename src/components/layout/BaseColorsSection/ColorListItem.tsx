import {
  AccordionListItem,
  ListItemText,
  type AccordionListItemProps,
} from 'components/general';

interface ColorListItemProps extends AccordionListItemProps {
  value: string;
  color: string;
  title: string;
}

const ColorListItem = ({
  value,
  color,
  title,
  ...props
}: ColorListItemProps) => (
  <AccordionListItem
    {...props}
    value={value}
    // Hex color has spaces so it's read correctly by screen readers
    aria-label={`${title} - ${color.split('').join(' ')}`}
    title={
      <>
        <div
          className='me-3 h-8 w-8 rounded-lg'
          style={{ backgroundColor: color }}
        />
        <ListItemText primary={title} secondary={color} />
      </>
    }
  />
);

export default ColorListItem;
