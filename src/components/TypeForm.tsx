import React from 'react'
import * as typeformEmbed from '@typeform/embed'

export class TypeForm extends React.Component {
  componentDidMount(): void {
    const popup1 = typeformEmbed.makePopup(
      'https://ixo.typeform.com/c/s1Zv4j',
      {
        mode: 'drawer_left',
        hideHeaders: true,
        hideFooter: true,
        autoOpen: false,
        onSubmit: () => {
          console.log('submitted')
        },
      },
    )

    document
      .getElementById('bt-left-drawer')
      .addEventListener('click', function() {
        popup1.open()
      })
  }

  render(): JSX.Element {
    return <button id="bt-left-drawer">Add Alpha bond</button>
  }
}
