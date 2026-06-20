import { useState } from 'react'
import { supabase } from './supabaseClient'

function FormDatDon({ onDatDonThanhCong }) {
  const [brand, setBrand] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [qty, setQty] = useState('')
  const [material, setMaterial] = useState('')
  const [notes, setNotes] = useState('')
  const [dangGui, setDangGui] = useState(false)
  const [thongBaoLoi, setThongBaoLoi] = useState('')

  async function xuLyGui(e) {
    e.preventDefault()

    if (!brand || !phone || !address || !qty) {
      setThongBaoLoi('Vui lòng điền đủ thương hiệu, số điện thoại, địa chỉ và số lượng.')
      return
    }

    setThongBaoLoi('')
    setDangGui(true)

    const maDonMoi = '#LX' + Math.floor(1000 + Math.random() * 9000)

    const { error } = await supabase.from('orders').insert({
      code: maDonMoi,
      client: brand,
      phone: phone,
      address: address,
      qty: parseInt(qty),
      material: material,
      notes: notes,
      stage_idx: 0,
      total: 0,
      paid_status: 'cho-thanh-toan'
    })

    setDangGui(false)

    if (error) {
      setThongBaoLoi('Có lỗi xảy ra, vui lòng thử lại.')
      console.error(error)
    } else {
      setBrand('')
      setPhone('')
      setAddress('')
      setQty('')
      setMaterial('')
      setNotes('')
      onDatDonThanhCong()
    }
  }

  return (
    <form onSubmit={xuLyGui} className="form-dat-don">
      <h2>Đặt đơn mới</h2>

      <label>Tên thương hiệu</label>
      <input
        type="text"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Ví dụ: Cty Tân Phát"
      />

      <label>Số điện thoại</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="090 xxx xxxx"
      />

      <label>Địa chỉ giao hàng</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Số nhà, đường, quận, thành phố"
      />

      <label>Số lượng (cái)</label>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        placeholder="Ví dụ: 1000"
      />

      <label>Chất liệu mong muốn</label>
      <input
        type="text"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        placeholder="Ví dụ: giấy mỹ thuật cán màng nhũ vàng"
      />

      <label>Yêu cầu thêm</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        placeholder="Thiết kế, màu sắc, kích thước..."
      />

      {thongBaoLoi && <p className="thong-bao-loi">{thongBaoLoi}</p>}

      <button type="submit" disabled={dangGui}>
        {dangGui ? 'Đang gửi...' : 'Gửi yêu cầu đặt đơn'}
      </button>
    </form>
  )
}

export default FormDatDon