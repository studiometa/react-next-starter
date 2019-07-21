import Grid        from '@material-ui/core/Grid';
import Paper       from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';
import React       from 'react';
import Inspector   from 'react-inspector';
import NoSSR       from 'react-no-ssr';
import config      from '../../config';
import routes      from '../../server/routes';
import Layout      from '../components/common/PageLayout';
import pageWrapper from '../lib/pageWrapper';


const Sandbox = React.memo(function ({ theme, pageData, reduxStore }) {
  return (
    <Layout pageData={pageData}>
      <Grid container direction="column" spacing={10}>

        {/** THEME **/}

        <Grid item xs={12}>
          <Typography variant="h2" color="primary" gutterBottom>Theme</Typography>
          <NoSSR>
            <Inspector
              theme="chromeDark"
              data={theme}
              expandLevel={1}
            />
          </NoSSR>
        </Grid>

        {/** TYPOGRAPHY **/}

        <Grid item xs={12}>
          <Typography variant="h2" color="primary" gutterBottom>
            Typography
          </Typography>
          <Typography>
            <b>font family:</b> {theme.typography.fontFamily.split(',')[0]}
          </Typography>
          <Typography gutterBottom>
            <b>font size:</b> {theme.typography.fontSize}
          </Typography>

          <Grid container spacing={4}>
            {
              Object.entries(theme.typography).map(([typoName, typoSettings]) => {
                if (typeof typoSettings !== 'object' || !typoSettings.newSet) return null;
                const fontSize = Number(typoSettings.fontSize.replace('rem', ''));
                return (
                  <Grid item xs={12} key={typoName}>
                    <Typography variant={typoName} component="h1" gutterBottom>
                      {typoName} ({fontSize}rem - {fontSize * theme.typography.fontSize}px)
                    </Typography>
                    <Typography variant={typoName} component="h1">
                      the quick brown fox jumps over the lazy dogs
                    </Typography>
                    <Typography variant={typoName} component="h1" style={{ textTransform: 'uppercase' }} gutterBottom>
                      the quick brown fox jumps over the lazy dogs
                    </Typography>
                    <NoSSR>
                      <Inspector
                        theme="chromeDark"
                        data={typoSettings}
                        expandLevel={0}
                      />
                    </NoSSR>
                  </Grid>
                );
              })
            }
          </Grid>
        </Grid>

        {/** COLORS **/}

        <Grid item xs={12}>
          <Typography variant="h2" color="primary" gutterBottom>Colors</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">Main</Typography>
            </Grid>
            {
              ['primary', 'secondary', 'error'].map(color => (
                <Grid item md={4} key={color} xs={12}>
                  <Paper style={{ background: theme.palette[color].main, padding: 10 }}>
                    <Typography variant="h5" style={{ color: theme.palette[color].contrastText }}>
                      {color.toUpperCase()}
                    </Typography>
                    <Typography variant="body1" style={{ color: theme.palette[color].contrastText }}>
                      {theme.palette[color].main}
                    </Typography>
                    <Paper style={{ background: theme.palette[color].light, padding: 10 }}>
                      <Typography style={{ color: theme.palette.getContrastText(theme.palette[color].light) }}>
                        Light: {theme.palette[color].light}
                      </Typography>
                    </Paper>
                    <Paper style={{
                      background: theme.palette[color].dark,
                      padding: 10,
                    }}>
                      <Typography style={{ color: theme.palette.getContrastText(theme.palette[color].dark) }}>
                        Dark: {theme.palette[color].dark}
                      </Typography>
                    </Paper>
                    <Typography style={{
                      background: 'transparent',
                      padding: 10,
                      color: theme.palette[color].contrastText,
                    }}>Contrast text: {theme.palette[color].contrastText}</Typography>
                  </Paper>
                </Grid>
              ))
            }

            <Grid item xs={12}>
              <Typography variant="h4" color="primary">Backgrounds</Typography>
            </Grid>

            {
              Object.entries(theme.palette.background).map(([colorName, colorHex]) => (
                <Grid item md={3} key={colorName}>
                  <Paper style={{ background: theme.palette.background[colorName], padding: 10 }}>
                    <Typography variant="h5" style={{ color: theme.palette.getContrastText(theme.palette.background[colorName]) }}>
                      {colorName.toLowerCase()}
                    </Typography>
                    <Typography variant="body1" style={{ color: theme.palette.getContrastText(theme.palette.background[colorName]) }}>
                      {colorHex}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            }

            <Grid item xs={12}>
              <Typography variant="h4" color="primary">Greys</Typography>
            </Grid>

            {
              Object.entries(theme.palette.grey).map(([colorName, colorHex]) => (
                <Grid item md={3} key={colorName}>
                  <Paper style={{ background: theme.palette.grey[colorName], padding: 10 }}>
                    <Typography variant="h5" style={{ color: theme.palette.getContrastText(theme.palette.grey[colorName]) }}>
                      {colorName.toLowerCase()}
                    </Typography>
                    <Typography variant="body1" style={{ color: theme.palette.getContrastText(theme.palette.grey[colorName]) }}>
                      {colorHex}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            }

          </Grid>
        </Grid>

        {/** OTHER **/}
        <Grid item xs={12}>
          <Typography variant="h2" color="primary" gutterBottom>Current Redux store</Typography>
          <NoSSR>
            <Inspector
              theme="chromeDark"
              data={reduxStore}
              expandLevel={0}
            />
          </NoSSR>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h2" color="primary" gutterBottom>Current config</Typography>
          <NoSSR>
            <Inspector
              theme="chromeDark"
              data={config}
              expandLevel={0}
            />
          </NoSSR>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h2" color="primary" gutterBottom>Current routes</Typography>
          <NoSSR>
            <Inspector
              theme="chromeDark"
              data={routes}
              expandLevel={0}
            />
          </NoSSR>
        </Grid>
      </Grid>
    </Layout>
  );
});


const mapStateToProps = state => ({ reduxStore: state });

export default pageWrapper(Sandbox, {
  name: '_sandbox',
  withTheme: true,
  mapStateToProps,
});
