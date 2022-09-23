import { paragraph} from 'txtgen'

async function  newParagraph(setNewPara, setData, dataStorage) {
    const dummyParagraph = paragraph()
    setNewPara(dummyParagraph)
    setData(dataStorage(dummyParagraph))

}

export default newParagraph;