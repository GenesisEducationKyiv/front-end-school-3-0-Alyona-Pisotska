import { ActionMeta, MultiValue, SingleValue } from 'react-select';

type SelectOption = {
  value: string;
  label: string;
};

type SelectComponentProps<IsMulti extends boolean = false> = {
  options: SelectOption[];
  value: IsMulti extends true ? MultiValue<SelectOption> | null : SingleValue<SelectOption> | null;
  onChange: (
    value: IsMulti extends true ? MultiValue<SelectOption> : SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  isMulti?: IsMulti;
  placeholder?: string;
  isDisabled?: boolean;
};

export type { SelectOption, SelectComponentProps };
