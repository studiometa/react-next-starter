import React       from 'react';
import Layout      from '../components/PageLayout';
import pageWrapper from '../lib/pageWrapper';
import Typography  from '@material-ui/core/Typography';
import Paper       from '@material-ui/core/Paper';
import Grid        from '@material-ui/core/Grid';
import Inspector   from 'react-inspector';
import config from '../../config'
import getRoutes from '../../server/routes'

const routes = getRoutes();

class _sandbox extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <Layout pageData={this.props.pageData} noPageData>
        <Grid container direction="column" spacing={40}>

          <Grid item xs={12}>
            <Typography variant="display3" component="h1" color="primary">Thème</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={theme}
              expandLevel={0}
            />

          </Grid>

          <Grid item xs={12}>
            <Typography variant="display3" component="h1" color="primary">Typography
              (font: {theme.typography.fontFamily.split(',')[0]})</Typography>
            <br/><br/>
            <Typography variant="display4" component="h1">display 4 - Hero title</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.display4}
              expandLevel={0}
            />
            <br/>
            <Typography variant="display3" component="h1">display 3 - H1 title</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.display3}
              expandLevel={0}
            />
            <br/>
            <Typography variant="display2" component="h2">display 2 - H2 title</Typography>
            <Typography>XS/SM size: 1.5rem</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.display2}
              expandLevel={0}
            />
            <br/>
            <Typography variant="display1" component="h3">display 1 - H3 title</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.display1}
              expandLevel={0}
            />
            <br/>
            <Typography variant="headline" component="h4">headline - H4 title</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.headline}
              expandLevel={0}
            />
            <br/>
            <Typography variant="title" component="h5">title - H5 title</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.title}
              expandLevel={0}
            />
            <br/>
            <Typography variant="subheading" component="h6"> subheading - H6 title</Typography>
            <Typography variant="subheading" component="h6" color="primary"> subheading - H6 title</Typography>
            <Typography variant="subheading" component="h6" color="secondary"> subheading - H6 title</Typography>
            <Typography variant="subheading" component="h6" color="error"> subheading - H6 title</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.subheading}
              expandLevel={0}
            />
            <br/>
            <Typography variant="body2" component="p">body 2 - Paragraph L : the quick brown fox jumps over the lazy
              dog</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.body2}
              expandLevel={0}
            />
            <br/>
            <Typography variant="body1" component="p">body 1 - Paragraph : the quick brown fox jumps over the lazy
              dog</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.body1}
              expandLevel={0}
            />
            <br/>
            <Typography variant="caption" component="span">caption - Paragraph S : the quick brown fox jumps over the
              lazy
              dog</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.caption}
              expandLevel={0}
            />
            <br/>
            <Typography variant="button" component="">button - navigation : the quick brown fox jumps over the lazy
              dog</Typography>
            <Inspector
              theme="chromeDark"
              data={theme.typography.button}
              expandLevel={0}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="display3" component="h1" color="primary">Colors</Typography>
            <br/><br/>
            <Grid container spacing={24}>
              <Grid item md={4}>
                <Paper style={{ background: theme.palette.primary.main, padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.primary.contrastText }}>ATELIERS
                    - Primary</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.primary.contrastText }}>{theme.palette.primary.main}</Typography>
                  <Paper style={{ background: theme.palette.primary.light, padding: 10,
                    color: theme.palette.getContrastText(theme.palette.primary.light) }}>Light: {theme.palette.primary.light}</Paper>
                  <Paper style={{ background: theme.palette.primary.dark, padding: 10, color: theme.palette.getContrastText(theme.palette.primary.dark) }}>Dark: {theme.palette.primary.dark}</Paper>
                  <Paper style={{ background: theme.palette.primary.contrastText, padding: 10, color: theme.palette.getContrastText(theme.palette.primary.contrastText) }}>Contrast text: {theme.palette.primary.contrastText}</Paper>
                </Paper>
              </Grid>
              <Grid item md={4}>
                <Paper style={{ background: theme.palette.secondary.main, padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.secondary.contrastText }}>PRIVATE
                    - Secondary</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.secondary.contrastText }}>{theme.palette.secondary.main}</Typography>
                  <Paper style={{ background: theme.palette.secondary.light, padding: 10, color: theme.palette.getContrastText(theme.palette.secondary.light) }}>Light: {theme.palette.secondary.light}</Paper>
                  <Paper style={{ background: theme.palette.secondary.dark, padding: 10, color: theme.palette.getContrastText(theme.palette.secondary.dark) }}>Dark: {theme.palette.secondary.dark}</Paper>
                  <Paper style={{ background: theme.palette.secondary.contrastText, padding: 10, color: theme.palette.getContrastText(theme.palette.secondary.contrastText) }}>Contrast text: {theme.palette.secondary.contrastText}</Paper>
                </Paper>
              </Grid>
              <Grid item md={4}>
                <Paper style={{ background: theme.palette.error.main, padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.error.contrastText }}>CADEAUX
                    - Error</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.error.contrastText }}>{theme.palette.error.main}</Typography>
                  <Paper style={{ background: theme.palette.error.light, padding: 10, color: theme.palette.getContrastText(theme.palette.error.light) }}>Light: {theme.palette.error.light}</Paper>
                  <Paper style={{ background: theme.palette.error.dark, padding: 10, color: theme.palette.getContrastText(theme.palette.error.dark) }}>Dark: {theme.palette.error.dark}</Paper>
                  <Paper style={{ background: theme.palette.error.contrastText, padding: 10, color: theme.palette.getContrastText(theme.palette.error.contrastText) }}>Contrast text: {theme.palette.error.contrastText}</Paper>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper style={{ background: theme.palette.text.primary, padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.getContrastText(theme.palette.text.primary) }}>BLACK
                    - primary</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.getContrastText(theme.palette.text.secondary) }}>{theme.palette.text.secondary}</Typography>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper style={{ background: theme.palette.grey[50], padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.getContrastText(theme.palette.grey[50]) }}>GREY
                    - 50</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.getContrastText(theme.palette.grey[50]) }}>{theme.palette.grey[50]}</Typography>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper style={{ background: theme.palette.grey[100], padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.getContrastText(theme.palette.grey[100]) }}>GREY
                    - 100</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.getContrastText(theme.palette.grey[100]) }}>{theme.palette.grey[100]}</Typography>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper style={{ background: theme.palette.grey[150], padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.getContrastText(theme.palette.grey[150]) }}>GREY
                    - 150</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.getContrastText(theme.palette.grey[150]) }}>{theme.palette.grey[150]}</Typography>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper style={{ background: theme.palette.grey[200], padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.getContrastText(theme.palette.grey[200]) }}>GREY
                    - 200</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.getContrastText(theme.palette.grey[200]) }}>{theme.palette.grey[200]}</Typography>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper style={{ background: theme.palette.grey[250], padding: 10 }}>
                  <Typography variant="headline" component="h4" style={{ color: theme.palette.getContrastText(theme.palette.grey[250]) }}>GREY
                    - 250</Typography>
                  <Typography variant="body2" component="p" style={{ color: theme.palette.getContrastText(theme.palette.grey[250]) }}>{theme.palette.grey[250]}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="display3" component="h1" color="primary">Current Redux store</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={this.props.reduxStore}
              expandLevel={0}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="display3" component="h1" color="primary">Current config</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={config}
              expandLevel={0}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="display3" component="h1" color="primary">Current routes</Typography>
            <br/><br/>
            <Inspector
              theme="chromeDark"
              data={routes}
              expandLevel={0}
            />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({ reduxStore: state });

export default pageWrapper(_sandbox, {
  name: '_sandbox',
  withTheme: true,
  mapStateToProps
});
