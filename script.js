const cols = document.querySelectorAll(".col")

const colorGenerator = () => {
    
    const template = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color += template[Math.floor(Math.random() * 16)]
    }

    return color
}


const setTextColor = (text, color) => {
    const luminance = chroma(color).luminance()
    if (luminance > 0.5) {
        text.style.color = "#000"
    } else {
        text.style.color = "#fff"
    }
} 


const changeColor = () => {
    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
    
        if (!isLocked) {
            const color = colorGenerator()
            const colText = col.querySelector('h2')
            const colButton = col.querySelector('button')
            
            colText.textContent = color
            col.style.background = color

            setTextColor(colText, color)
            setTextColor(colButton, color)
        }
    })
}


const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text)
}


changeColor()

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type
    
    if (type === 'lock') {
        const node = event.target.tagName.toLocaleLowerCase() == 'i'
            ? event.target
            : event.target.children[0]
        
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClipboard(event.target.textContent)
    }
})

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if(event.code.toLocaleLowerCase() === 'space') {
        changeColor()
    }
})

