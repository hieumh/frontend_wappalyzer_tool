import React from 'react'
import '../css/Content.css'

function Content(){
    return(
        <div id='content' className='col-10'>
            <form method='post' action='' className='analyze'>
                <input type='text' name='url' size='150'/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}

export default Content