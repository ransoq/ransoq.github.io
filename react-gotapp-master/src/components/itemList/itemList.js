import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
// import ErrorMessage from '../error';
// import PropTypes from 'prop-types';
// import gotService from '../../services/gotService';

function ItemList ({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then( (data) => {
                updateList(data);
            })
            // .catch(() => {onError()});
    }, [])

    // function onError(){
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    if(!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;

// Компоненты высшего порядка

// const withData = (View, getData) => {
//     return class extends Component {

//         state = {
//             data: null,
//             error: false
//         }
    
//         static propTypes = {
//             onItemSelected: PropTypes.func
//         }
    
//         componentDidMount() {
//             getData()
//                 .then( (data) => {
//                     this.setState({
//                         data,
//                         error: false
//                     })
//                 })
//                 .catch(() => {this.onError()});
//         }
        
//         render() {
//             const {data, error} = this.state;

//             if(error){
//                 return <ErrorMessage/>
//             }
    
//             if(!data) {
//                 return <Spinner/>
//             }

//             return <View {...this.props} data={data}/>
//         }
//     }
// }
// const {getAllCharacters} = new gotService();
// export default withData(ItemList, getAllCharacters);