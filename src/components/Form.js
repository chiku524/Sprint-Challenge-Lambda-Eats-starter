import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
//import {Route, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const Form = (props) => {

    const[form, setForm] = useState({
        name: '',
        size: '',
        pepperoni: false,
        sausage: false,
        pineapple: false,
        cheese: false,
        special_instructions: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        size: '',
        pepperoni: false,
        sausage: false,
        pineapple: false,
        cheese: false,
        special_instructions: ''
    })

    const [post, setPost] = useState([])

    const [buttonDisabled, setButtonDisabled] = useState('')

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field').min(2, "Name must be at least 2 characters"),
        size: yup.object().required('Must select a size'),
        pepperoni: yup.boolean().defined(),
        sausage: yup.boolean().defined(),
        pineapple: yup.boolean().defined(),
        cheese: yup.boolean().defined(),
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
                    special_instructions: ''
                })
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const inputChange = (event) => {
        event.persist();
        
        const newFormData = {...form, [event.target.name]: (event.target.type === 'checkbox' ? event.target.checked : event.target.value)}
        validate(event);
        setForm(newFormData);
    }

    return(
        <div className='formContainer'>
            <form onSubmit={formSubmit} className='form'>
                <label htmlFor='name'>Name <br />
                    <input type='text' placeholder='Name' name='name' data-cy='name' value={form.name} onChange={inputChange} className='name' />
                </label> <br />
                <label htmlFor='size' >Pick a size <br />
                    <select className='size' data-cy='size' value={form.size} onChange={inputChange} >
                        <option value='null' disabled>Select a size</option>
                        <option value={form.size}>Small</option>
                        <option value={form.size}>Medium</option>
                        <option value={form.size}>Large</option>
                        <option value={form.size}>Extra Large</option>
                    </select>
                </label> <br />
                <label htmlFor='toppings'>Toppings <br />
                    <span>Pepperoni</span> <input type='checkbox' name='pepperoni' checked={form.toppings} onChange={inputChange} /> <br />
                    <span>Sausage</span> <input type='checkbox' name='sausage' checked={form.toppings} onChange={inputChange} /> <br />
                    <span>Pineapple</span> <input type='checkbox' name='pineapple' checked={form.toppings} onChange={inputChange} /> <br />
                    <span>Cheese</span> <input type='checkbox' name='cheese' checked={form.toppings} onChange={inputChange} /> <br />
                </label> <br />
                <label htmlFor='specialInstructions' className='textArea'>
                    <textarea value={form.special_instructions} onChange={inputChange} >Special instructions...</textarea>
                </label> <br />
                <button disabled={buttonDisabled}>Submit</button>
            </form>
        </div>
    )
}

export default Form;