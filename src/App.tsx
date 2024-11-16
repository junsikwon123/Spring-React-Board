import BoardItem from 'components/BoardItem';
import './App.css';
import { latestBoardlistMock, top3BoardListMock,commentListMock, favoriteListMock } from 'mocks';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavorieItem';

function App() {
  return (
   <>
   <div style={{display:'flex'  , columnGap: '30px', rowGap:'20px'}}>
   {favoriteListMock.map(favoriteListItem => <FavoriteItem  favoriteListItem={favoriteListItem}/>)}
   </div>
     
   </>
  );
}

export default App;
