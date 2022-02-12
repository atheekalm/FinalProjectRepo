import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../test_redux/configureStore';
import CategoryIcon from '@mui/icons-material/Category';
import { categoriesSelector, fetchCategories, fetchsubcategories, subcategoriesSelector } from './CategorySlice';
import { subcategory } from '../../app/models/Category';
import { setServiceParams } from '../Services/serviceSlice';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}


export default function LocationsDetails() {

  const category = useAppSelector(categoriesSelector.selectAll);
  const subcategory = useAppSelector(subcategoriesSelector.selectAll);
  const dispatch = useAppDispatch();
  const { categoriesLoaded } = useAppSelector(state => state.Category);
  const { subcategoriesLoaded } = useAppSelector(state => state.SubCategory);
  const [getSubCate, setSubCate] = useState<subcategory[]>([]);
  const [SelectedSubcatego, setSubcatego] = useState('');

  useEffect(() => {
    if (!categoriesLoaded) dispatch(fetchCategories());
    if (!subcategoriesLoaded) dispatch(fetchsubcategories());
  }, [categoriesLoaded, subcategoriesLoaded, dispatch])

  const [openList, setOpenList] = useState(false);

  const handleClick = (Id: number) => {
    setOpenList(true);
    setSubCate(subcategory.filter(subcat => subcat.categoryId === Id));
  };

  
  const SelectSub = (subcato: string) => {
    setOpen(false);
    setSubcatego(subcato);
    dispatch(setServiceParams({ SubCategory: subcato }))

  }


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary={SelectedSubcatego || "Categories"} />
      </ListItemButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        
        <DialogContent dividers sx={{width:'450px'}}>
          <Grid container spacing={2} item>

            <Grid item>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {category.map(cate => (
                  <ListItemButton
                    key={cate.id}
                    onClick={() => handleClick(cate.id)}
                    style={{ backgroundColor: 'transparent' }}>
                    <ListItemText primary={cate.categoryName} />
                    {openList ? <ArrowForwardIosIcon fontSize='small' /> : <ArrowForwardIosIcon fontSize='small' />}
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List
                  sx={{ marginTop: 0.3 }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {getSubCate?.map(sub =>
                    <ListItemButton key={sub.id} onClick={() => SelectSub(sub.subCategoryName)}>
                      <ListItemText primary={sub.subCategoryName} />
                    </ListItemButton>
                  )}
                </List>
              </Collapse>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}