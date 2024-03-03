import {useState, } from 'react'


import './Search.css'

type FormProps = { 
    loadTasks: (e: React.FormEvent<HTMLFormElement>, rating?: string[], status?: string[]) => Promise<void>
}



const Search = ({loadTasks}: FormProps) => {

    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [statusValue, setStatusValue] = useState<string[]>([])


    const handleCheckbox = (value: string) => {
        if(selectedValues?.includes(value)){
            setSelectedValues(selectedValues.filter(item => item !== value))
        } 
        
        setSelectedValues([...selectedValues, value])
    } 
    
    
    const handleStatus = (value: string) => {
        if(statusValue.includes(value)){
            setStatusValue(statusValue.filter(item => item !== value))
        }

        setStatusValue([...statusValue, value])
    }


    const cleanForm = () => {
        window.location.reload()
    }

    



  return (
    <div className='search-task'>
        <form onSubmit={(e) => loadTasks(e, selectedValues, statusValue)}>
            <div className='filter-options'>
                <div className="rating-search">
                    <h3>Nível de importância</h3>
                    <div className='option-item'>
                        <input 
                            type="checkbox"
                            name='rating-input' 
                            id="five-stars" 
                            value="very_important"
                            checked={selectedValues?.includes("very_important")}
                            onChange={() => handleCheckbox("very_important")}
                        />
                        <label htmlFor='five-stars' className='customCheck'>5 estrelas</label>
                    </div> 
                    <div className='option-item'>
                        <input 
                            type="checkbox" 
                            name='rating-input' 
                            id="four-stars" 
                            value="important"
                            checked={selectedValues?.includes("important")}
                            onChange={() => handleCheckbox("important")}
                        />
                        <label htmlFor='four-stars' className='customCheck'>4 estrelas</label>
                    </div> 
                    <div className='option-item'>
                        <input 
                            type="checkbox" 
                            name='rating-input' 
                            id="three-stars" 
                            value="medium"
                            checked={selectedValues?.includes("medium")}
                            onChange={() => handleCheckbox("medium")}
                        />
                        <label htmlFor='three-stars' className='customCheck'>3 estrelas</label>
                    </div> 
                    <div className='option-item'>
                        <input 
                            type="checkbox" 
                            name='rating-input' 
                            id="two-stars" 
                            value="slightly_important"
                            checked={selectedValues?.includes("slightly_important")}
                            onChange={() => handleCheckbox("slightly_important")}
                        />
                        <label htmlFor='two-stars' className='customCheck'>2 estrelas</label>
                    </div> 
                    <div className='option-item'>
                        <input 
                            type="checkbox" 
                            name='rating-input' 
                            id="one-star" 
                            value="not_important"
                            checked={selectedValues?.includes("not_important")}
                            onChange={() => handleCheckbox("not_important")}
                        />
                        <label htmlFor='one-star' className='customCheck'>1 estrela</label>
                    </div> 
                </div>
                <div className="status-search">
                    <h3>Status</h3>
                    <div className='option-item'>
                        <input 
                            type="checkbox" 
                            name='status-input' 
                            id="done" 
                            value="done"
                            checked={statusValue?.includes("done")}
                            onChange={() => handleStatus("done")}
                        />
                        <label htmlFor='done' className='customCheck'>Concluídas</label>
                    </div>
                    <div className='option-item'> 
                        <input 
                            type="checkbox" 
                            name='status-input' 
                            id="unfinished" 
                            value="unfinished"
                            checked={statusValue?.includes("unfinished")}
                            onChange={() => handleStatus("unfinished")}
                        />
                        <label htmlFor='unfinished' className='customCheck'>Incompletas</label>
                    </div>
                </div>
            </div>
            <div className="input-buttons">
                <input type="submit" value="Filtrar" className='green-button'/>
                <button className='red-button' onClick={cleanForm}>Limpar Filtros</button>
            </div>
        </form>
    </div>
  )
}

export default Search