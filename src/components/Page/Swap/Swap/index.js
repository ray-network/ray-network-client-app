import React from 'react'
import { Input, Form, Select, Button, Alert } from 'antd'
import { useSelector } from 'react-redux'
import AmountFormatter from 'components/Layout/AmountFormatter'
import style from './style.module.scss'

const swapAssets = [
  {
    ticker: 'ADA',
    hash: 'lovelace',
  },
  {
    ticker: 'RAY',
    hash: '7a920d21f8b6a7edbd8db5d30c36f009fa8ae9028698359697b8a34647ab7b17.ray',
  },
  {
    ticker: 'ERGO',
    hash: '09fa8ae9028698359697b8a34647ab7b177a920d21f8b6a7edbd8db5d30c36f0.ergo',
  },
]

const Swap = () => {
  const [form] = Form.useForm()
  const walletAssetsSummary = useSelector((state) => state.wallets.walletAssetsSummary)

  return (
    <div>
      <div className="mb-4">
        <Alert
          message="RAY Swap will be available in the Goguen Era"
          description="Since this feature is directly related to smart contracts, it will be released as soon as Cardano brings it to life - in the Goguen Era."
          type="info"
          showIcon
        />
      </div>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Input.Group compact className={style.assetGroup}>
          <Form.Item
            className={style.assetTicker}
            label="From"
            name="fromTicker"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select size="large" placeholder="Select">
              {walletAssetsSummary.tokens.map((token, index) => {
                return (
                  <Select.Option key={index}>
                    <div className={style.assetTo}>
                      <span className={style.assetIcon}>?</span>
                      <span className={style.assetTo}>{token.ticker}</span>
                    </div>
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            className={style.assetAmount}
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input
              size="large"
              placeholder="0.000000"
              autoComplete="off"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            className={style.assetDonate}
            label="Donate"
            name="donate"
            tooltip="This donation will be used for further RAY Network development. Not required."
          >
            <Input size="large" placeholder="0" autoComplete="off" style={{ width: '100%' }} />
          </Form.Item>
        </Input.Group>
        <Form.Item
          label="To"
          name="toTicker"
          rules={[{ required: true, message: 'Please slect ticker' }]}
        >
          <Select size="large" placeholder="Select">
            {swapAssets &&
              swapAssets.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.hash}>
                    <div className={style.assetTo}>
                      <span className={style.assetIcon}>?</span>
                      <span className="mr-2">{item.ticker}</span>
                      <span className="badge badge-light">
                        {item.hash.slice(0, 4)}...{item.hash.slice(-10)}
                      </span>
                    </div>
                  </Select.Option>
                )
              })}
          </Select>
        </Form.Item>
        <div className="ray__item ray__item--success">
          <div className="row">
            <div className="col-lg-6">
              <div className="ray__form__item mb-3">
                <div className="ray__form__label">You will send</div>
                <div className="ray__form__amount">
                  <AmountFormatter amount={0} ticker="ada" hash="lovelace" large />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ray__form__item">
                <div className="ray__form__label">Fee (inlc. in total)</div>
                <div className="ray__form__amount">
                  <AmountFormatter amount={0} ticker="ada" hash="lovelace" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="ray__form__item">
                <div className="ray__form__label">You will receive</div>
                <div className="ray__form__amount">
                  <AmountFormatter amount={0} ticker="ada" hash="lovelace" large />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ray__form__item">
                <div className="ray__form__label mb-3">Rate</div>
                <div className="ray__form__amount">
                  <strong>0 ADA = 0 RAY</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Form.Item className="mt-4">
          <Button
            htmlType="submit"
            disabled
            size="large"
            type="primary"
            className="ray__btn__send w-100"
          >
            <i className="fe fe-repeat" />
            <strong>Swap</strong>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Swap
