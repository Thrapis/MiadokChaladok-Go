import { SignInForm } from 'features/authentication/sign-in';

import css from './ElementsTest.module.css';

import { 
    Button, Icon, TextField,
    TextArea, Checkable, Dropdown, StarRating
} from 'shared/ui';

class Honey {
    constructor(
        public id: number, 
        public name: string
    ) {}
    toString(): string {
        return `${this.name}`;
    }
}

export const ElementsTest = () => {
    const list = [
        new Honey(1, 'Ліпавы'),
        new Honey(2, 'Каштанавы'),
        new Honey(3, 'Кліновы'),
        new Honey(4, 'Абліпіхавы'),
    ];

    return(
        <>
            <SignInForm />

            <form style={{display: "none"}} className={css.container} method='POST' action='/send'>
                    <div className={css.block}>
                        <Button onClick={() => alert("fuck")} size='large' width='height'>
                            <Icon type='check'/>
                        </Button>
                        <Button onClick={() => alert("fuck")} size='small' width='height' theme='outlined'>
                            <Icon type='magniglass'/>
                        </Button>
                        <Button onClick={() => alert("fuck")} theme='text' width='height'>
                            <Icon type='x'/>
                        </Button>
                        <Button onClick={() => alert("fuck")} size='small' width='fluid' theme='contained' shape='round'>
                            <Icon type='twitter'/><span>Ціўтар нах</span>
                        </Button>
                        <Button onClick={() => alert("fuck")} size='medium' width='fluid' theme='outlined' shape='round'>
                            <Icon type='twitter'/><span>Ціўтар нах</span>
                        </Button>
                        <Button onClick={() => alert("fuck")} size='large' width='fluid' theme='contained' shape='round'>
                            <Icon type='twitter'/><span>Ціўтар нах</span>
                        </Button>
                    </div>
                    <div className={css.block}>
                        <TextField type='text' placeholder='Імя...' name='name'/>
                        <TextField type='password' placeholder='Пароль' name='password'/>
                        <TextArea
                            placeholder='Камментар...'
                            annotation='даўжыня максімум 500 сімвалаў'
                            resize='fixed'
                            rows={2}
                            maxLength={500}
                            name='comment'
                        />
                    </div>
                    <div className={css.block}>
                        <Checkable type='checkbox' labelText='Click it' name='check' defaultValue='true'/>
                        <Checkable type='radio' labelText='Click it 1' name='radio' defaultValue='r1'/>
                        <Checkable type='radio' labelText='Click it 2' name='radio' defaultValue='r2' defaultChecked={true}/>
                        <Checkable type='radio' labelText='Click it 3' name='radio' defaultValue='r3'/>
                    </div>
                    <div className={css.block}>
                        <Dropdown 
                            optionList={list} 
                            name='honeyType'
                            className={css.dropdown}
                            onChange={() => console.log('dropdown changed')}
                            size='small'
                        />
                    </div>
                    <div className={css.block}>
                        <StarRating name='rating' defaultValue={3}/>
                    </div>
                    <div className={css.block}>
                        <Button type='submit' width='fluid'>Submit</Button>
                    </div>
            </form>
        </>
    )
}

