import React, {useState} from 'react';
import './HomeModal.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '70vw',
    height: '60vh',
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function HomeModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton className="modalBtn" type="button" onClick={handleOpen}>
        <ExpandMoreIcon fontSize="large">

        </ExpandMoreIcon>
      </IconButton>
     
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="imageContainer"
              style={{backgroundImage: `url(${props.person.profile_image})`}}
            >
              
            </div>
            <div className="modalTech">
              <p className="modalTechChip">{props.person.tech_one}</p>
              <p className="modalTechChip">{props.person.tech_two}</p>
              <p className="modalTechChip">{props.person.tech_three}</p>
            </div>
            <div className="bioContainer">
              <p>{props.person.bio}</p>
            </div>
            <div className="githubContainer">
              <div className="devType">
                <p className="github">{props.person.dev_type}</p>
              </div>
              <div className="devType">
                <p className="github">{props.person.github}</p>
              </div>
            </div>
          
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}