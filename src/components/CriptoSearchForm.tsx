import { currencies } from "../data"

export default function CriptoSearchForm() {
  return (
    <form className="form">
        <div className='field'>
            <label htmlFor="currency">Moneda:</label>
            <select 
                id="currency" 
                name="currency" //Nos va permitir escribir en el state
            >
                <option value="">-- Seleccione --</option>
                {currencies.map( currency => (
                    <option 
                        key={currency.code}
                        value={currency.code}
                    >
                        {currency.name}
                    </option>
                ))}
            </select>
        </div>

        <div className='field'>
            <label htmlFor="criptocurrency">Criptooneda:</label>
            <select 
                id="criptocurrency" 
                name="criptocurrency" //Nos va permitir escribir en el state
            > <option value="">-- Seleccione --</option>
            </select>
        </div>

        <input type="submit" value='Cotizar' />
    </form>
  )
}
