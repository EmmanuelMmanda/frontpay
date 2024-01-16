import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";

const Header = ({ user, onLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
 

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          style={{
            title: {
              flexGrow: 1,
            },
          }}
        >
          Welcome, {user ? user.username : ""}
        </Typography>

        <Button color="inherit" onClick={() => logout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
