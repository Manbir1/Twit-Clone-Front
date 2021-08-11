import React, { useState, useEffect, useContext } from 'react'
import { 
    Grid, 
    Paper, 
    Divider, 
    Typography, 
    TextField, 
    makeStyles, 
    Box, 
    IconButton, 
    Collapse } from '@material-ui/core'
import { useHistory } from 'react-router'
import AuthContext from '../Context/AuthContext';
import UserContext from '../Context/UserContext';
import MessageProfile from '../Components/Messages/MessageProfile'
import MessageContainer from '../Components/Messages/MessageContainer'
import AddIcon from '@material-ui/icons/Add';
import isAuth from '../utils/useAuth';

const useStyles = makeStyles({
    root: {
        height: "100vh"
    },
    verticalDivide: {
        height: "93vh"
    },
    inputRounded: {
        position: "absolute",
        bottom: "10px",
        [`& fieldset`]: {
            borderRadius: 20,
          },
        width: "100%",
    },
    messageBox: {
        flex: 1,
        position: "relative",
        height: "93vh"
    },
    addButton: {

    }
})

export default function MessagePage() {
    const classes = useStyles()

    let history = useHistory()
    const {auth, setAuth} = useContext(AuthContext)
    const {setUser} = useContext(UserContext)

    const [contactArray, setContactArray] = useState([])
    const [currPage, setPage] = useState(-1)
    const [message, setMessage] = useState('')
    const [messageArr, setMessageArr] = useState([{content: "hello"},{content: "goodbye"}])
    const [addField, setAddField] = useState('')
    const [openField, setOpenField] = useState(false)

    const handleChange = () => {
        setOpenField((openField) => !openField);
    };

    useEffect(function handleAuth(){
        (async () => {
            const obj = await isAuth(auth, setAuth, setUser)
            if(!auth){
                history.push('/login')
            }
        })()
    },[auth,history,setAuth])

    useEffect(function handleAPI(){
        (async () => {
            const response = await (await fetch(`http://localhost:8000/contacts`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })).json()

            setContactArray(response)

        })()
    },[])

    const _keydownEnter = () => {
        setMessageArr(messageArr.concat([{content: message}]))
        console.log(currPage)
        console.log(message)
    }

    const onContactAdd = () => {

    }

    return (
        <Paper square variant="outlined" elevation={0} className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography style={{margin: "10px"}} variant="h5">Messages</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12} sm={5}>
                    {contactArray.map(elem => 
                        <> 
                            <MessageProfile name={elem.name} username={elem.username} key={elem.id} id={elem.id} setPage={setPage}/>
                            <Divider />
                        </>
                    )}
                    <IconButton className={classes.addButton} onClick={handleChange}>
                        <AddIcon />
                    </IconButton>
                    <Collapse in={openField}>
                        <TextField 
                            variant="outlined"
                            placeholder="Add contact"
                            onChange={(e) => setAddField(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key == 'Enter'){
                                    onContactAdd()
                                }
                            }}
                        />
                    </Collapse>
                </Grid>
                <Divider flexItem orientation="vertical" className={classes.verticalDivide} variant="fullWidth"/>
                <Grid item sm={7} className={classes.messageBox}>
                    <Box style={{height: "90%", overflow: "scroll"}}>
                        <MessageContainer messageArr={messageArr}/>
                    </Box>
                    <TextField
                        className={classes.inputRounded}
                        placeholder="Make a message"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {if(e.key=='Enter'){_keydownEnter()}}}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}
