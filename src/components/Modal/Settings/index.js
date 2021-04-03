import React from 'react'
import { Modal, Input, Button, Popconfirm, Tooltip } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'
import { kebabCase } from 'lodash'
import { stringToBinary } from 'utils/utils'
import style from './style.module.scss'

const SettingsModal = () => {
  const dispatch = useDispatch()
  const modalSettings = useSelector((state) => state.settings.modalSettings)
  const walletParams = useSelector((state) => state.wallets.walletParams)

  const handleCancel = () => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'modalSettings',
        value: false,
      },
    })
  }

  const setWalletName = (e) => {
    dispatch({
      type: 'wallets/CHANGE_WALLET_NAME',
      payload: {
        name: e.target.value,
      },
    })
  }

  const getKeyFile = () => {
    const file = new Blob([stringToBinary(JSON.stringify(walletParams, undefined, 2))], {
      type: 'application/json',
      name: `ray-${kebabCase(walletParams.name)}.key`,
    })

    saveAs(file, `ray-${kebabCase(walletParams.name)}.key`)
  }

  const deleteWallet = () => {
    dispatch({
      type: 'wallets/DELETE_WALLET',
    })
  }

  return (
    <Modal
      title={
        <div>
          <div>Wallet Settings</div>
          <small className="text-muted">{walletParams.accountId}</small>
        </div>
      }
      footer={null}
      visible={modalSettings}
      onCancel={handleCancel}
      width={620}
    >
      <div className="ray__form__label">Wallet Name</div>
      <div className="mb-4">
        <Input value={walletParams.name} size="large" onChange={setWalletName} />
      </div>
      <div className="ray__form__label">Danger Zone</div>
      <div className={style.danger}>
        <div className={style.dangerItem}>
          <div>
            <div>
              <strong>Export .key file</strong>
            </div>
            <div>Export the .key file if you want to back up your data</div>
          </div>
          <div className="ml-auto pl-3">
            {walletParams.encrypted && (
              <Popconfirm
                placement="topRight"
                title="Export the .key file of this wallet?"
                onConfirm={getKeyFile}
                okText="Export"
                cancelText="Cancel"
              >
                <Button>
                  <i className="fe fe-download mr-2" />
                  Export .key
                </Button>
              </Popconfirm>
            )}
            {!walletParams.encrypted && (
              <Tooltip title="Wallet must be encrypted">
                <Button disabled>
                  <i className="fe fe-download mr-2" />
                  Export .key
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
        <div className={style.dangerItem}>
          <div>
            <div>
              <strong>Delete wallet</strong>
            </div>
            <div>Delete all wallet data from this device</div>
          </div>
          <div className="ml-auto pl-3">
            <Popconfirm
              placement="topRight"
              title="Delete this wallet from this device?"
              onConfirm={deleteWallet}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button>
                <i className="fe fe-trash-2 mr-2" />
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal
