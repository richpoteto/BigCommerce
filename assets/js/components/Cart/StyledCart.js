import styled from 'styled-components';


const StyledCart = styled.div`
height: 100%;
color: #000;
.item-option{
  display: flex;
  gap: 4px;
}
.continue{
  background: #24AAE1;
  color: #fff;
  padding: 5px 10px;
  margin: 10px 0px;
  font-size: 22px;
  text-transform: uppercase;
  @media(min-width: 767px){
    display: none;
  }
}
svg{
  width: 20px;
  height: 20px;
}
.flex{
  display: flex;
}
.item-single-price{
  font-size: 14px;
  color: #24AAE1;
}
 .cart-preview{
      display: flex;
      flex-direction: column;
      height: 100%;
  }
  .cart-error{
    width: 100%;
    padding: 0px 10px;
    span{
      color: red;
    }
  }
  .close-btn:hover{
    background-color: inherit;
  }
  .close-btn svg{
    width: 35px;
    height: 35px;
  }
  .cart-preview_header{
      display: flex;
      position: relative;
      .cart-preview_close{
        position: absolute;
        right: 20px;
        color: #000;
        font-size: 30px;
      }
      .cart-preview_title{
        font-weight: 600;
        font-size: 32px;
        color: #494949;
        font-family: inherit;
        display: block;
        text-transform: uppercase;
        flex-grow: 1;
        text-align: center;
      }
  }
  .cart-preview_footer{
      margin-top: auto;
      padding-bottom: 20px;
      color: #000;
      .cart-total-item{
        color: #000;
      }
      .cart-btn{
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        .checkout{
          background: #D81B5C;
        }
        a{
          background: #0071ba;
          color: #fff;
          width: 100%;
          text-align: center;
          font-size: 24px;
          padding: 5px 25px;
          text-transform: uppercase;
          font-weight: bold;
        }
      }
  }
  .flex-row{
    display: flex;
  }

  .cart-preview_body{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .cartPreview-content{
        padding: 50px 0px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 25px;
        .line-item{
            &.removing{
              opacity: .5;
            }
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 25px;
            border-bottom: 1px solid #ccc;
            .item-options{
              margin-top: 10px;
              padding: 10px;
              span{
                font-weight: bold;
              }
              ul{
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                li{
                  font-size: 12px;
                }
              }
            }
            .item-body{
                padding: 0px 15px;
                color: #000;
                display: flex;
                flex-direction: column;
                a{
                  color: #000;
                }
                
            }
            .qty-selection{
              display: flex;
              gap: 10px;
              align-items: center;
            }
            .item-actions{
              padding-top: 20px;
              margin-top: auto;
              display: flex;
              justify-content: space-between;
              margin-left: 10px;
              width: 100%;
              align-items: center;
              
              .item-remove{
                &:hover{
                  cursor: pointer;
                }
              }
          }
        }
    }
  }
`;

export default StyledCart;
