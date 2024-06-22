import React, { useState } from 'react';
import { MenuItem, Button, InputLabel, Select, FormControl, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

export function FilterInDev({ listings, setListings }) {
    const theme = useTheme();
    
    // Filter dependencies
    const [tags, setTags] = useState([]);
    const tagOptions = [
        { label: 'Fundraiser', value: 'fundraiser' },
        { label: 'Scam', value: 'scam' },
        { label: 'Volunteering', value: 'volunteering' },
    ]

    const handleTagsChange = (event) => {
        setTags(event.target.value.split(','));
        console.log(event.target.value);
    }

    const handleFilter = () => {
        tags.map(tag => 
            setListings((OldListings) => 
                OldListings.filter(listing => 
                    listing.tags && listing.tags.includes(tag)
                )
            )
        )
    }


    return (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-select-label">Name</InputLabel>
            <Select
              labelId="multiple-select-label"
              id="multiple-select"
              multiple
              value={tags}
              onChange={handleTagsChange}
              input={<OutlinedInput label="Tag" />}
              MenuProps={MenuProps}
            >
              {tagOptions.map((tag) => (
                <MenuItem
                  key={tag.value}
                  value={tag.value}
                  style={getStyles(tag, tags, theme)}
                >
                  {tag.label}
                </MenuItem>
              ))}
            </Select>
            <Button sx={{ display: 'flex', height: 1, alignSelf: 'center' }} variant="contained" color="primary" onClick={handleFilter}>Apply</Button>
          </FormControl>
        </div>
      );
}