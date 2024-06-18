import css from './ElementsTest.module.css';

import { 
    Button, Icon, InputField,
    TextArea, Checkable, InputSelect, StarRating
} from 'shared/ui';

export const ElementsTest = () => {
    const list = [
        {'value': '1', 'title': 'Ліпавы'},
        {'value': '2', 'title': 'Каштанавы'},
        {'value': '3', 'title': 'Кліновы'},
        {'value': '4', 'title': 'Абліпіхавы'},
    ];

    return(
        <>
            <form style={{display: "none"}} className={css.container} method='POST' action='/send'>
                    <div className={css.block}>
                        <Button onClick={() => alert("Халера!")} size='large' width='height'>
                            <Icon type='check'/>
                        </Button>
                        <Button onClick={() => alert("Халера!")} size='small' width='height' theme='outlined'>
                            <Icon type='magniglass'/>
                        </Button>
                        <Button onClick={() => alert("Халера!")} theme='text' width='height'>
                            <Icon type='x'/>
                        </Button>
                        <Button onClick={() => alert("Халера!")} size='small' width='fluid' theme='contained' shape='round'>
                            <Icon type='twitter'/><span>Ціўтар нах</span>
                        </Button>
                        <Button onClick={() => alert("Халера!")} size='medium' width='fluid' theme='outlined' shape='round'>
                            <Icon type='twitter'/><span>Ціўтар нах</span>
                        </Button>
                        <Button onClick={() => alert("Халера!")} size='large' width='fluid' theme='contained' shape='round'>
                            <Icon type='twitter'/><span>Ціўтар нах</span>
                        </Button>
                    </div>
                    <div className={css.block}>
                        <InputField type='text' placeholder='Імя...' name='name'/>
                        <InputField type='password' placeholder='Пароль' name='password'/>
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
                        <Checkable type='checkbox' labelText='Click it' name='check' value='true'/>
                        <Checkable type='radio' labelText='Click it 1' name='radio' value='r1'/>
                        <Checkable type='radio' labelText='Click it 2' name='radio' value='r2' checked={true}/>
                        <Checkable type='radio' labelText='Click it 3' name='radio' value='r3'/>
                    </div>
                    <div className={css.block}>
                        <InputSelect 
                            options={list} 
                            selected={list[0]}
                            name='honeyType'
                            className={css.dropdown}
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

