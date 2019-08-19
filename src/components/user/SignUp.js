import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import MaterialButton from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom'; 
import { Spin, Upload, message, Button, Icon, Result } from 'antd';
import '../../App.css'
import axios from 'axios';
import Nav from '../Nav.js'
import MenuItem from '@material-ui/core/MenuItem';


const theme = {
    spacing: [0, 2, 3, 5, 8],
}

const states = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
];

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text"
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};

export default function SignUp(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const [isSuccessful, setisSuccessful] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [state, setUserState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZip] = useState('');

    const checkUploadResult = (resultEvent) => {
        if(resultEvent.event === 'success'){
           setProfilePic(resultEvent.info.secure_url);
        }
    }

    let widget = window.cloudinary.createUploadWidget({
        cloudName: 'dxtgsafec',
        uploadPreset: 'xpqy7emf'
    }, (error, result) => checkUploadResult(result));

    const showWidget = (widget) => {
        widget.open();
    }

    const handleFirstName = (event) => {
        const name = event.target.value;
        setFirstName(name); 
    }

    const handleLastName = (event) => {
        const name = event.target.value;
        setLastName(name);
    }

    const handlePassword = (event) => {
        const pass = event.target.value;
        setPassword(pass);
    }

      const handleEmail = (event) => {
        const email = event.target.value;
          setEmail(email); 
    }

    const handlePhoneNumber = (event) => {
        const number = event.target.value;
        setPhoneNumber(number);
    }

    const handleCompany = (event) => {
        const company = event.target.value;
        setCompany(company);
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleProfilePic = (info) => {
        
        if (info.file.status === 'done') {
            // Get this url from response in real world.

            
            getBase64(info.file.originFileObj, (imageUrl) => {
            
                setProfilePic(imageUrl);
                
            });
        }
        
    }

    const handleState = event => {
        const userState = event.target.value
        const error = 'Must be in Louisiana'
        if (userState === 'Louisiana'){
            setUserState(userState);
        } else {
            setUserState(error)
        }
    };

    const handleCity = event => {
        const userCity = event.target.value
        setCity(userCity);
    };

    const handleZip = event => {
        const zip = event.target.value;
        setZip(zip);
    }


    const formValidator = async () => {
        let creationCredentials = { name: `${firstName} ${lastName}`, 
                                    email: email, 
                                    phone_number: phoneNumber, 
                                    profile_pic: profilePic, 
                                    company: company,
                                    location: `${city}, ${state} ${zipCode}`,
                                    password: password}
        // create better form validation
        if(firstName.length > 1 && lastName.length > 1 && password.length > 1 && email.length > 1 && phoneNumber.length >= 1){
            setSignedUp(true);

            let userCreationResponse = await axios.post('/user', creationCredentials);
            // console.log(userCreationResponse);
            if(userCreationResponse.status === 201){
            setSignedUp(false);
            setisSuccessful(true)
            }
        }

    }

  

    return (
        <div>
            <Nav />
        <Grid container component="main" className={classes.root}>
          
           
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                   
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                    <Spin spinning={signedUp} size="large"></Spin>
                    {isSuccessful ?  <Result
                                    status="success"
                                    title="Successfully Signed Up!"
                                     subTitle="Return Home to view properties in your area"
                                    extra={[
                                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}> 
                                <Button type="primary" key="console">
                                     Go to your profile
                                </Button>,
                                </Link>
                                        ]}
                                /> : null}
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                onChange={handleFirstName}
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={firstName.length === 0 ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                onChange={handleLastName}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                error={lastName.length === 0 ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handleEmail}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={email.length === 0 ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handlePassword}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={password.length === 0 ? true : false}
                                autoComplete="current-password"
                            />
                        </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    variant="outlined"
                                    onChange={handlePhoneNumber}
                                    fullWidth
                                    name="Phone Number"
                                    label="Phone Number"
                                    id="phoneNumber"
                                    error={phoneNumber.length === 0 ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleCompany}
                                    fullWidth
                                    name="Company"
                                    label="Company (optional)"
                                    id="company"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        select
                                        value={state}
                                        label="Select"
                                        fullWidth
                                        onChange={handleState}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu
                                            }
                                        }}
                                        helperText="Please select your state"
                                        // margin="normal"
                                        variant="outlined"
                                    >
                                        {states.map(state => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                   
                            </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        onChange={handleCity}
                                        fullWidth
                                        name="City"
                                        label="City"
                                        id="city"
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        onChange={handleZip}
                                        fullWidth
                                        name="Zip Code"
                                        label="Enter your zip code"
                                        id="zip"
                                    />
                                </Grid>
                            <Grid item xs={12} >
                            <Typography marginTop={5} component="h6" variant="h7">
                                Upload profile picture:
                            </Typography>
                                <Button onClick={() => showWidget(widget)}>Upload</Button>
                            </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                            
                    </Grid>
                    <MaterialButton
                        // type="submit"
                        onClick={formValidator}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </MaterialButton>
                    <Grid container justify="flex-end">
                        <Grid item>
                                <Link to="/signIn" style={{ color: 'white', textDecoration: 'none' }}>
                                    <TextLink href="#" variant="body2">
                                        {"Already have an account? Sign in"}
                                    </TextLink>
                                </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                {/* <MadeWithLove /> */}
            </Box>
            </Grid>
        </Grid>
        </div>
    );
}
