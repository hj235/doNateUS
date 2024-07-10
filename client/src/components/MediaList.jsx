import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function MediaList({media}) {
  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'auto' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {media.map((url, idx) => (
          <ImageListItem key={url}>
            <img
              srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${url}?w=248&fit=crop&auto=format`}
              alt={'image-'+idx}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}