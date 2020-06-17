import React, {useState, useEffect} from 'react';
//import {Route, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import OrderUp from './OrderUp';

const Form = (props) => {

    const [text, setText] = useState('Add to Order')
    const [form, setForm] = useState({
        name: '',
        size: 'Small',
        pepperoni: false,
        sausage: false,
        pineapple: false,
        cheese: false,
        special_instructions: '',
        sauce: 'Red',
        glutenFree: false
    })

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        pepperoni: false,
        sausage: false,
        pineapple: false,
        cheese: false,
        special_instructions: '',
        sauce: '',
        glutenFree: false
    })

    const button1 = document.getElementsByTagName('button');
    console.log(button1);
    function pizzaReady(){
        setText('Congrats! Pizza is on its way!');
    }

    const [post, setPost] = useState([])

    const [buttonDisabled, setButtonDisabled] = useState('')

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field').min(2, "Name must be at least 2 characters"),
        size: yup.string().required('Must select a size'),
        sauce: yup.string(),
        glutenFree: yup.string(),
        pepperoni: yup.string().defined(),
        sausage: yup.string().defined(),
        pineapple: yup.string().defined(),
        cheese: yup.string().defined(),
        special_instructions: yup.string().notRequired()
    })

    useEffect(() => {
        formSchema.isValid(form).then((valid) => {
            setButtonDisabled(!valid);
        })
    }, [form, formSchema]);

    const validate = (event) => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then((valid) => {
                setErrors({
                    ...errors, [event.target.name]: ""
                })
            })
            .catch((error) => {
                console.log(error.errors);
                setErrors({
                    ...errors, [event.target.name]: error.errors[0]
                })
            })
    }

    const formSubmit = (event) => {
        event.preventDefault();
        axios.post('https://reqres.in/api/pizza', form)
            .then((response) => {
                setPost([...post, response.data]);
                console.log(post);
                setForm({
                    name: '',
                    size: '',
                    pepperoni: false,
                    sausage: false,
                    pineapple: false,
                    cheese: false,
                    special_instructions: '',
                    sauce: '', 
                    glutenFree: false
                })
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const inputChange = (event) => {
        event.persist();
        
        const newFormData = {...form, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value}
        console.log(event.target.name, event.target.value, event.target.checked)
        validate(event);
        setForm(newFormData);
    }

    return(
        <div className='formContainer'>
            <form onSubmit={formSubmit} className='form'>
                <label htmlFor='name'>Name <br />
                    <input type='text' placeholder='Name' name='name' data-cy='name' value={form.name} onChange={inputChange} className='name' /> {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null} <br />
                </label> <br />
                <label htmlFor='size' >Pick a size <br />
                    <select className='size' name='size' data-cy='size' value={form.size} onChange={inputChange} >
                        <option value='null' disabled>Select a size</option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                        <option value='Extra Large'>Extra Large</option>
                    </select>
                </label> <br />
                <label htmlFor='glutenFree'>Gluten Free
                    <input type='checkbox' name='glutenFree' checked={form.glutenFree} onChange={inputChange} /> <br />
                </label>
                <label htmlFor='sauce'> Sauce <br />
                    <select className='sauce' name='sauce' data-cy='sauce' value={form.sauce} onChange={inputChange}>
                        <option value='red'>Red</option>
                        <option value='white'>White</option>
                        <option value='barbeque'>Barbeque</option>
                        <option value='none'>None</option>
                    </select> <br />
                </label>
                <label htmlFor='toppings'>Toppings <br />
                    <span>Pepperoni</span> <input type='checkbox' name='pepperoni' value='Pepperoni' checked={form.pepperoni} onChange={inputChange} /> <br />
                    <span>Sausage</span> <input type='checkbox' name='sausage' value='Sausage' checked={form.sausage} onChange={inputChange} /> <br />
                    <span>Pineapple</span> <input type='checkbox' name='pineapple' value='Pineapple' checked={form.pineapple} onChange={inputChange} /> <br />
                    <span>Cheese</span> <input type='checkbox' name='cheese' value='Cheese' checked={form.cheese} onChange={inputChange} /> <br />
                </label> <br />
                <label htmlFor='specialInstructions' className='textArea'>
                    <textarea value={form.special_instructions} data-cy='special_instructions' onChange={inputChange} name='special_instructions'>Special instructions...</textarea>
                </label> <br />
                <button disabled={buttonDisabled} data-cy='submit' onClick={pizzaReady}>{text}</button>
            </form>
            <br />
            <br />
            <br />
            {post.map((order) => (<OrderUp className='order' name={order.name} size={order.size} pepperoni={order.pepperoni} sausage={order.sausage} pineapple={order.pineapple} cheese={order.cheese} sauce={order.sauce} special_instructions={order.special_instructions} glutenFree={order.glutenFree} /> ))}
        </div>
    )
}

export default Form;