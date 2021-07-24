import { Paper, IconButton, InputBase, makeStyles } from "@material-ui/core";
import { Search, FilterList, Clear } from "@material-ui/icons";
import { useRef, useEffect, useState } from "react";
import { useStore } from "react-context-hook";
import { MyDialog } from ".";

const useStyle = makeStyles({
  searchBox: {
    width: 275,
    paddingLeft: 0,
    display: 'flex',
    borderRadius: 50,
    fontSize: '1rem',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid var(--shade40)',
  },
  filterBtn: {
    backgroundColor: '#fff',
    border: '1px solid var(--shade40)',
    '&:hover': {
      backgroundColor: '#ececec'
    }
  },
});

const Header = () => {
  const styles = useStyle();
  const header = useRef();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [, setCurrSearch] = useStore('search');

  useEffect(() => {
    window.onscroll = (e) => {
      if (window.pageYOffset > 30) {
        header.current.classList.add('collapsed');
      } else {
        header.current.classList.remove('collapsed');
      }
    };
  }, []);

  const handleDialogClose = () => {
    setOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrSearch(search);
  }

  const handleClear = () => {
    setSearch('');
    setCurrSearch('');
  }

  return (
    <header className="main-header" ref={header}>
      <div className="content container">
        <h1>Air Recipes</h1>
        <p className="body">Best Recipes for Best People</p>

        <div className="search-container">
          <Paper component="form" classes={{ root: styles.searchBox }} elevation={0} onSubmit={handleSubmit}>
            <IconButton type="submit"><Search /></IconButton>
            <InputBase
              value={search}
              placeholder="Search"
              onChange={e => setSearch(e.target.value)}
            />
            {search !== '' && <IconButton onClick={handleClear}><Clear /></IconButton>}
          </Paper>

          <IconButton classes={{ root: styles.filterBtn }} onClick={() => setOpen(true)}>
            <FilterList />
          </IconButton>
        </div>
      </div>
      <MyDialog open={open} onClose={handleDialogClose} />
    </header>
  );
}

export default Header;