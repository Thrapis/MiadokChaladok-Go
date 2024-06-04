import cn from 'classnames';

import css from './CheckboxGroup.module.css';

type OptionType = {
    value: string
    title: string
}

type OptionProps = {
    size?: 'small' | 'medium' | 'large'
    theme?: 'default' | 'button'
    className?: string

    value: OptionType["value"]
    title: OptionType["title"]
    selected: OptionType["value"][]
    groupName: string
    onChange?: (value: string) => void
}

const Option = ({
    size = 'medium',
    theme = 'default',
    className,
    value,
    title,
    selected,
    groupName,
    onChange
}: OptionProps) => {
    const handleChange = () => onChange?.(value);
    const isChecked = selected.includes(value);

    return (
        <label
            className={cn(
                css.wrapper,
                css[`${theme}Theme`],
                css[`${size}Size`])
            }
            tabIndex={0}
        >
            <input
                className={cn(css.input)}
                onChange={handleChange}
                type='checkbox'
                name={groupName}
                value={value}
                tabIndex={-1}
                checked={isChecked}
            />
            <span className={css.checkmark}></span>
            <span className={cn(css.label, className)}>
                {title}
            </span>
        </label>
    );
};

export type CheckboxGroupProps = {
    className?: string
    optionClassName?: string
    size?: 'small' | 'medium' | 'large'
    theme?: 'default' | 'button'

    name: string
    options: OptionType[];
    selected: OptionType["value"][];
    onChange?: (value: string[]) => void;
}

export const CheckboxGroup = ({
    className,
    optionClassName,
    size = 'medium',
    theme = 'default',
    name,
    options,
    selected,
    onChange,
}: CheckboxGroupProps) => {
    const handleChange = (value: string) => {
        const newSelected = selected.includes(value) ? 
            selected.filter(i => i !== value) : [ ...selected, value ]
        onChange?.(newSelected)
    };

    return (
        <div className={cn(css.group, className)}>
            {options.map(({ value, title }) => (
                <Option
                    size={size}
                    theme={theme}
                    className={optionClassName}
                    key={crypto.randomUUID()}
                    groupName={name}
                    value={value}
                    title={title}
                    selected={selected}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
}