import { SelectList } from '@/typings/interfaces';
import { SortOptions } from '@/typings/enums';
import { getEnumValues } from '@/helpers/enum.helpers';

export function useSortOptions(): SelectList[] {
  const sortValues = getEnumValues<SortOptions, string>(SortOptions as never);

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
