import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  name: string;
  subDepartments: string[];
}

const departments: Department[] = [
  {
    name: 'HR',
    subDepartments: ['Recruitment', 'Payroll'],
  },
  {
    name: 'Engineering',
    subDepartments: ['Development', 'QA'],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (department: string) => {
    setOpen((prev) => prev.includes(department) ? prev.filter(item => item !== department) : [...prev, department]);
  };

  const handleSelect = (department: string, subDepartment: string | null = null) => {
    let updatedSelected = [...selected];
    if (subDepartment) {
      if (selected.includes(subDepartment)) {
        updatedSelected = updatedSelected.filter(item => item !== subDepartment);
      } else {
        updatedSelected.push(subDepartment);
      }
      const allSubDepartmentsSelected = departments.find(d => d.name === department)?.subDepartments.every(sd => updatedSelected.includes(sd)) ?? false;
      if (allSubDepartmentsSelected) {
        updatedSelected.push(department);
      } else {
        updatedSelected = updatedSelected.filter(item => item !== department);
      }
    } else {
      if (selected.includes(department)) {
        updatedSelected = updatedSelected.filter(item => !departments.find(d => d.name === department)?.subDepartments.includes(item));
        updatedSelected = updatedSelected.filter(item => item !== department);
      } else {
        updatedSelected.push(department);
        updatedSelected = [...new Set([...updatedSelected, ...departments.find(d => d.name === department)?.subDepartments ?? []])];
      }
    }
    setSelected(updatedSelected);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F2F2F2',
        padding: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <List>
        {departments.map(dept => (
          <div key={dept.name}>
            <ListItem button onClick={() => handleToggle(dept.name)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected.includes(dept.name) && dept.subDepartments.every(sd => selected.includes(sd))}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleSelect(dept.name)}
                />
              </ListItemIcon>
              <ListItemText primary={`${dept.name} (${dept.subDepartments.length})`} />
              {open.includes(dept.name) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open.includes(dept.name)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dept.subDepartments.map(subDept => (
                  <ListItem key={subDept} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selected.includes(subDept)}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleSelect(dept.name, subDept)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDept} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;
