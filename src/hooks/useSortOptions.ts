import { SelectListItem } from '@/typings/interfaces';
import { SortOptions } from '@/typings/enums';
import { getEnumValues } from '@/helpers/enum.helpers';

/**
 * Gets sort options as select list item array
 */
export function useSortOptions(): SelectListItem[] {
  // get values from sort options enum
  const sortValues = getEnumValues<SortOptions, string>(SortOptions as never);

  // map values to select list item
  return sortValues.map(sortValue => {
    let text = 'Please select...';
    switch (sortValue) {
      case SortOptions.Asc:
        text = 'Ascending';
        break;
      case SortOptions.Desc:
        text = 'Descending';
        break;
      default:
        break;
    }

    return {
      value: sortValue,
      text,
    };
  });
}
