import React from 'react'
import { ToggleLayer, anchor, Arrow } from 'react-laag'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ButtonBase from '@material-ui/core/ButtonBase'

function DropDown(): JSX.Element {
  const useStyles = makeStyles(theme =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    }),
  )

  const classes = useStyles()

  return (
    <ToggleLayer
      // provide placement config
      placement={{
        anchor: anchor.BOTTOM_CENTER,
        autoAdjust: true,
      }}
      // render-prop to render our layer
      renderLayer={({
        layerProps,
        isOpen,
        arrowStyle,
        layerSide,
      }): JSX.Element =>
        // only render on `isOpen`
        isOpen && (
          <div
            // for calculation stuff
            ref={layerProps.ref}
            style={{
              // inject calculated positional styles
              ...layerProps.style,
              width: 290,
              height: 270,
              backgroundColor: '#e7f5ff',
              top: 420,
              zIndex: 9,
            }}
          >
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase
                      className={classes.image}
                      style={{ backgroundColor: 'blue' }}
                    >
                      <img
                        className={classes.img}
                        alt="button 1"
                        src={require('../../assets/images/dropdown/cap.png')}
                      />
                    </ButtonBase>

                    <ButtonBase
                      className={classes.image}
                      style={{ backgroundColor: 'red' }}
                    >
                      <img
                        className={classes.img}
                        alt="button 2"
                        src={require('../../assets/images/dropdown/pattern.png')}
                      />
                    </ButtonBase>

                    <ButtonBase
                      className={classes.image}
                      style={{ backgroundColor: 'green' }}
                    >
                      <img
                        className={classes.img}
                        alt="button 3"
                        src={require('../../assets/images/dropdown/growth.png')}
                      />
                    </ButtonBase>

                    <ButtonBase
                      className={classes.image}
                      style={{ backgroundColor: 'orange' }}
                    >
                      <img
                        className={classes.img}
                        alt="button 4"
                        src={require('../../assets/images/dropdown/wheelchair.png')}
                      />
                    </ButtonBase>

                    <ButtonBase
                      className={classes.image}
                      style={{ backgroundColor: 'pink' }}
                    >
                      <img
                        className={classes.img}
                        alt="button 5"
                        src={require('../../assets/images/dropdown/walking-stick.png')}
                      />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Paper>
            </div>

            <Arrow
              style={arrowStyle}
              layerSide={layerSide}
              backgroundColor="#e7f5ff"
              borderWidth={1}
              borderColor="#d8d6d9"
              roundness={0.5}
            />
          </div>
        )
      }
    >
      {({ toggle, triggerRef }): JSX.Element => (
        <button
          ref={triggerRef}
          className="toggle-btn"
          onClick={toggle}
          style={{
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 1,
            margin: 8,
            fontWeight: 500,
            fontStyle: 'normal',
            fontFamily: 'Roboto',
            fontSize: 16,
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 6,
            paddingRight: 6,
            borderRadius: 4,
            alignItems: 'center',
            height: 40,
            width: 100,
            // &:hover {
            //   borderColor: 'blue'
            // }
          }}
        >
          Beneficiary
        </button>
        // <div ref={triggerRef} onClick={toggle}>
        //   <Button>Beneficiary</Button>
        // </div>
      )}
    </ToggleLayer>
  )
}

export default DropDown
