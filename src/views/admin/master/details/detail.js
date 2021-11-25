import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext } from '@material-ui/lab';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Allergies from '../masterAllergies/master-allergies';
import Diagnoses from '../masterDiagnoses/masterDiagnoses';
import Medication from '../masterMedication/master-medication';
import Procedurecodes from '../masterProcedurecodes/master-procedurecodes';
import PatientDemographics from '../../../patient/patientDemographics/patientDemographics';
const style = {
   
margin:'10px'
  };

export default function Tabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Allergies" value="1" style={{margin :'10px'}}/>
            <Tab label="Procedurecodes" value="2" style={{margin :'15px'}}/>
            <Tab label="Medication" value="3" style={{margin :'15px'}}/>
            <Tab label="Diagnoses" value="4" style={{margin :'15px'}}/>
          </TabList>
        </Box>
        <TabPanel value="1"><Allergies/></TabPanel>
        <TabPanel value="2"><Procedurecodes/></TabPanel>
        <TabPanel value="3"><Medication/></TabPanel>
        <TabPanel value="4"><Diagnoses/></TabPanel>
      </TabContext>
    </Box>
  );
}