import { Grid } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import InventoryIcon from "@mui/icons-material/Inventory";

const Dashboard = () => (
  <DashboardLayout>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Products"
          value="120"
          icon={<InventoryIcon />}
          color="#00e5ff"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Inventory"
          value="350"
          icon={<InventoryIcon />}
          color="#1de9b6"
        />
      </Grid>
    </Grid>
  </DashboardLayout>
);

export default Dashboard;
